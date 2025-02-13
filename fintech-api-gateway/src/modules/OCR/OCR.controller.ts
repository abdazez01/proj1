import { FastifyReply, FastifyRequest } from "fastify";
import { comparePassword,generateVerificationCode, hashPassword } from "../../utils/hash";
import { server } from "../..";
import { addImageToOCR, delAllOCRForUser, getImageToOCR } from "../OCR/OCR.service";
import { delAllExpensesForUser, getAllExpensesPrice } from "../Expenses/Expenses.service";
import { sendRecoveryEmail, sendVerificationEmail } from '../../utils/verification';
import { delAllBonusesForUser, getAllBonusesPrice } from "../Bonuses/Bonuses.service";
import axios, { AxiosResponse } from 'axios';
import { streamToBuffer } from '../../utils/Image'; 
import { getImageinput, sendImageinput } from "./OCR.schema";
import FormData from 'form-data';

interface Detection {
    classes: string;
    confidence: number;
    image: string;
  }

  interface resq {
    category: string;
    item_name: string;
    price: number;
    count: number;
  }

  interface endthis {
    ExpenseName:string;
    Price:number;
    createdAt:Date;
    Category:string;
    Item_Count:number;
  }


export async function uploadImageHandler(request: FastifyRequest<{Body:sendImageinput}>, reply: FastifyReply) {
    const base64Data = request.body.ImageInBase64
  
    if (!base64Data) {
      return reply.code(400).send({ message: 'No file uploaded' });
    }
  
    try {
      await addImageToOCR(request.user.ID,base64Data);
      const imageclass = await sendImageAsFileForClass(Buffer.from(base64Data, 'base64'))
      if (!imageclass.detections?.length) {
        return reply.code(404).send({ message: "No detections found" });
      }
      const namesocr: string[] = [];
      for (const detection of imageclass.detections) {
        if (detection.classes.includes("4")) {
          try {
            const t = await sendImageAsFileForOCR(Buffer.from(detection.image, 'base64'));
            namesocr.push(t.text);
          } catch (ocrError) {
            console.error("OCR Failed for detection:", ocrError);
          }
        }
      }
      const now =Date.now();
      const finalocr : resq[]=[]
      for (const names of namesocr) {
          try {
            const t = await sendTextForPrediction(names);
            finalocr.push(t)
          } catch (ocrError) {
            console.error("OCR Failed for detection:", ocrError);
          }
        
      }
        const responss :endthis[]=[]
        for (const item of finalocr) {
            responss.push({
              ExpenseName: item.item_name,
              Category: item.category,
              Item_Count: item.count,
              Price: item.price,
              createdAt: new Date(now)
            });
          }
          if(!responss){
            return reply.code(405).send({ message: "No detections found" });
          }
          console.log("\n\n\n"+responss+"\n\n\n")

            return reply.code(201).send({
        responss
      });
    } catch (error) {
      console.error('Error saving image:', error);
      return reply.code(500).send({ message: 'Error saving image', error });
    }
  }

  export async function getImageHandler(request: FastifyRequest<{ Body: getImageinput }>, reply: FastifyReply) {
    const imageRecord = await getImageToOCR(request.body.Id)
  
    if (!imageRecord) {
      return reply.code(404).send({ message: "Image not found" });
    }
  
    const imageBuffer = Buffer.from(imageRecord.Image, 'base64');
  
    reply
      .header('Content-Type', 'image/jpeg')
      .send(imageBuffer);
  }

  
  async function sendImageAsFileForClass(imageBuffer: Buffer): Promise<{detections: Detection[]}> {
    const form = new FormData();

    form.append('file', imageBuffer, {
      filename: 'image.jpg',
      contentType: 'image/jpeg',
    });
  
    try {
      const response = await axios.post('http://host.docker.internal:8000/predict/', form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending image as file:', error);
      throw error; 
    }
  }

  async function sendImageAsFileForOCR(imageBuffer: Buffer): Promise<{text:string}> {
    const form = new FormData();

    form.append('image', imageBuffer, {
      filename: 'image.jpg',
      contentType: 'image/jpeg',
    });
  
    try {
      const response = await axios.post('http://host.docker.internal:8001/ocr/', form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending image as file:', error);
      throw error; 
    }
  }

  async function sendTextForPrediction(text: string): Promise<{
    category: string;
    item_name: string;
    price: number;
    count: number;
  }> {
    try {
      const response = await axios.post('http://host.docker.internal:8002/predict', {
        text: text  
      }, {
        headers: {
          'Content-Type': 'application/json'  
        }
      });
      
      return {
        category: response.data.category,
        item_name: response.data["item name"],
        price: response.data.price,
        count: response.data.count
      };
      
    } catch (error) {
      console.error('Prediction API error:', error);
      throw error;
    }
  }
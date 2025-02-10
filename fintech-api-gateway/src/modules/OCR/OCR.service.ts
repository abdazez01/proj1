import { date } from "zod";
import prisma from "../../utils/prisma";

export async function delAllOCRForUser(owener_ID:number){
    return prisma.oCR.deleteMany({
        where:{Account_ID:owener_ID}
    });
  };

  export async function addImageToOCR(owener_ID:number,image64:string){
    return prisma.oCR.create({
        data:{Account_ID:owener_ID,Image:image64}
    });
  };

  
  export async function getImageToOCR(image_ID:number){
    return prisma.oCR.findUnique({
        where: { Report_ID:image_ID },
      });
  };
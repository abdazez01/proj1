import { FastifyInstance } from "fastify";
import { Schema } from "zod";
import { getImageHandler, uploadImageHandler } from "./OCR.controller";
import { $ref } from "./OCR.schema";

 async function oCRRoutes (server:FastifyInstance) {
  server.post('/uploadImage', {
    preHandler: [server.authenticate],
    schema: {
      openapi: {
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Image file to upload'
                  }
                },
                required: ['file']
              }
            }
          }
        }
      },
      response: {
        201: $ref('ocrresponsSchema')
      },
      headers: {
        type: 'object',
        properties: {
          authorization: { 
            type: 'string', 
            pattern: '^Bearer\\s.+$'
          }
        },
        required: ['authorization']
      }
    }
  }, uploadImageHandler);


      
}

export default oCRRoutes
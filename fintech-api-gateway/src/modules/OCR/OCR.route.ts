import { FastifyInstance } from "fastify";
import { Schema } from "zod";
import { getImageHandler, uploadImageHandler } from "./OCR.controller";
import { $ref } from "./OCR.schema";

 async function oCRRoutes (server:FastifyInstance) {
  server.post('/uploadImage', {
    preHandler: [server.authenticate],
    schema: {
body:$ref('sendImageSchema'),
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
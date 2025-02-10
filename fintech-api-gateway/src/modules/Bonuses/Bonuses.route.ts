import { FastifyInstance } from "fastify";
import { Schema } from "zod";
import { $ref } from "./Bonuses.schema";
import { createBonusHandler, delBonusHandler, getBonusesHandler, updateBonusHandler } from "./Bonuses.controller";

async function bonusesRoutes(server:FastifyInstance) {

    server.post('/add',{
         preHandler: [server.authenticate],
                schema:{
                body: $ref("bonusSchema"),
                response:{
                    201:$ref("bonusResponseSchema"),
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
        
     },createBonusHandler)

    server.get('/get',{
        preHandler: [server.authenticate],
           schema:{
               response:{
                   201:$ref("bonusResponsesSchema"),
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
   
   },getBonusesHandler)    
   
   server.delete('/delete',{preHandler: [server.authenticate],schema:{body:$ref("bonusDelSchema")}},delBonusHandler)

   server.put(
    "/update",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("bonusUpdateSchema"),
        response: {
          201: $ref("bonusResponseSchema"),
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
      },
    },
    updateBonusHandler
  );

}
export default bonusesRoutes

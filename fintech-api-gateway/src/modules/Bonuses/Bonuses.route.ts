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
                }
            }
        
     },createBonusHandler)

    server.get('/get',{
        preHandler: [server.authenticate],
           schema:{
               response:{
                   201:$ref("bonusResponsesSchema"),
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
      },
    },
    updateBonusHandler
  );

}
export default bonusesRoutes

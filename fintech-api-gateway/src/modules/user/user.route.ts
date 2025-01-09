import { FastifyInstance } from "fastify";
import { delUserHandler, getUserInfoHandler, loginHandler, registerUserHandler, updateUserInfoHandler, verificationSenderHandler, verifiyUserHandler } from "./user.controller";
import { Schema } from "zod";
import { $ref } from "./user.schema";
async function userRoutes(server:FastifyInstance) {
    

server.post("/register",{
    schema:{

        body: $ref("createUserSchema"),
        response:{
            201:$ref("createUserResponseSchema"),
        }
    }
},registerUserHandler);

server.post('/login',{
    schema:{
        body: $ref("loginSchema"),
        response:{
            200:$ref("loginResponseSchema"),
    }}
},loginHandler)


server.get('/fetchInfo',{
    preHandler: [server.authenticate],
    schema:{
        response:{
            201:$ref("returnuserinfo"),
        }
    }
},getUserInfoHandler)

server.delete('/delete',{preHandler: [server.authenticate]},delUserHandler);

server.put('/update',{preHandler: [server.authenticate],
    schema:{
        body: $ref("updateUserSchema"),
        response:{
            201:$ref("updateUserSchema"),
        }
    }
},updateUserInfoHandler)

server.put('/sendVerificationCode',
   {
    schema:{
        body:$ref("verifySentSchema"),
        response:{
            201:$ref("verifySentResponseSchema"),
        }
    }
   },
verificationSenderHandler)



server.put('/verify',
    {
     schema:{
         body:$ref("verifyUserSchema"),
         response:{
             201:$ref("verifyUserResponseSchema"),
         }
     }
    },
verifiyUserHandler)
 
 }


export default userRoutes
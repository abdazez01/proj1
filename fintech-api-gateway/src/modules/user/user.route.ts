import { FastifyInstance } from "fastify";
import { chatrHandler, delUserHandler, getUserInfoHandler, loginHandler, recommendUserHandler, recoverUserHandler, recoverySenderHandler, registerUserHandler, updateUserInfoHandler, userFinHandler, verificationSenderHandler, verifiyUserHandler } from "./user.controller";
import { Schema, string } from "zod";
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
},getUserInfoHandler)

server.delete('/delete',{preHandler: [server.authenticate],schema:{ 
     headers: {
    type: 'object',
    properties: {
      authorization: { 
        type: 'string', 
        pattern: '^Bearer\\s.+$'
      }
    },
    required: ['authorization']
  }}},delUserHandler);

server.put('/update',{preHandler: [server.authenticate],
    schema:{
        body: $ref("updateUserSchema"),
        response:{
            201:$ref("updateUserSchema"),
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
 
server.get('/financialReport',{
    preHandler: [server.authenticate],
    schema:{
        response:{
            201:$ref("finInfoSchema"),
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
},userFinHandler)

server.put('/sendRecoveryCode',
    {
     schema:{
         body:$ref("verifySentSchema"),
         response:{
             201:$ref("verifySentResponseSchema"),
         }
     }
    },
 recoverySenderHandler)



server.put('/resetPassword',
    {
     schema:{
         body:$ref("recoverPassword"),
         response:{
             201:$ref("recoverUserResponseSchema"),
         }
     }
    },
    recoverUserHandler)

server.get('/recommend',{
    preHandler: [server.authenticate],
    schema:{
        response:{
            201:$ref("recommendedSchema")
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
},recommendUserHandler)


server.post("/chat",{
    preHandler: [server.authenticate],
    schema:{
        body:$ref('noooooSchema'),
        response:{
            201:$ref('DeepSeekAPIResponseSchema')
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
},chatrHandler);

}

export default userRoutes
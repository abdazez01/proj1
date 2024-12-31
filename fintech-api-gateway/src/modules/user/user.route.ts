import { FastifyInstance } from "fastify";
import { getUserInfoHandler, getUsersHandler, loginHandler, registerUserHandler } from "./user.controller";
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

server.get('/',{
    preHandler: [server.authenticate]
}, getUsersHandler)

server.get('/fetchInfo',{
    preHandler: [server.authenticate],
    schema:{
        response:{
            201:$ref("returnuserinfo"),
        }
    }
},getUserInfoHandler)

}




export default userRoutes
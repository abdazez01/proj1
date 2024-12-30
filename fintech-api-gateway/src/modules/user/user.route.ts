import { FastifyInstance } from "fastify";
import { getUsersHandler, loginHandler, registerUserHandler } from "./user.controller";
import { Schema } from "zod";
import { $ref } from "./user.schema";
async function userRoutes(server:FastifyInstance) {
    

server.post("/add",{
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

}


export default userRoutes
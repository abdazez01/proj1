import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import dotenv from 'dotenv';
import { date } from 'zod';
import userRoutes from './modules/user/user.route';
import {userSchema} from './modules/user/user.schema';
import fjwt from '@fastify/jwt';
import swaggerui from '@fastify/swagger-ui';
import swagger from '@fastify/swagger';
import {withRefResolver}from 'fastify-zod';
import expensesHandler from './modules/Expenses/Expenses.route';
import { expensesSchema } from './modules/Expenses/Expenses.schema';
// Load environment variables from .env
dotenv.config();

// SSL certificate and key
const key = fs.readFileSync('./cert/root.key');
const cert = fs.readFileSync('./cert/root.crt');

// Initialize Prisma Client
const prisma = new PrismaClient();

declare module "@fastify/jwt"{
  export interface FastifyJWT{
    user:{
        "ID":number,
        "Email":string
    }
  }
}

declare module "fastify"{
  export interface FastifyInstance{
    authenticate: any
  }
}

export const server = Fastify({
  logger:true,
  https: {
    key,
    cert,
  },
});

server.register(fjwt,{
  secret:'sgfhjuhnhjuihhmmkiughjkiuyhnhjjkiuyuhjjklopoo'
});

server.decorate("authenticate", async (request:FastifyRequest,reply:FastifyReply)=>{
  try{
    await request.jwtVerify();
  }catch(e){
    return reply.send(e)
  }


});

server.get("/isok",async function() {
  return {status:"OK"};
});

async function main() {

  for(const schema of [...userSchema,...expensesSchema]){
    server.addSchema(schema);
  }

  server.register(swagger, {
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'API for managing users and accounts',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      schemes: ['https'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  server.register(swaggerui, {
    routePrefix: '/docs', // This serves Swagger UI at /docs
    
    staticCSP: true,
    
    transformStaticCSP: (header) => header,
  });
  


  server.register(userRoutes, {prefix: '/user'})
  server.register(expensesHandler,{prefix: '/expenses'})

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server running at https://localhost:3000`);
    console.log(`Swagger UI available at https://localhost:3000/docs`);

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
}
main ();
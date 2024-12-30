import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { createUserInput, loginInput } from "./user.schema";
import { comparePassword } from "../../utils/hash";
import { server } from "../..";

export async function registerUserHandler(request:FastifyRequest<
    {
        Body: createUserInput;
    }
    >, reply:FastifyReply) {
    
    const body = request.body;

    try{
        const user = await createUser(body);

        return reply.code(201).send(user);
    }catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }

}

export async function loginHandler(request:FastifyRequest<
    {
        Body: loginInput;
    }
    >, reply:FastifyReply) {
        const body= request.body

        const user = await findUserByEmail(body.Email)

        if(!user){
            return reply.code(401).send({
                message: "invalid email"
            });
        }

        const correctPassword = await comparePassword(body.HashedPassword,user.HashedPassword)

        if(correctPassword){
            const {HashedPassword,...rest}=user

            return {accessToken: server.jwt.sign(rest)}
        }
    else{
        return reply.code(401).send({
            message: "invalid password"
        });
    }
}

export async function getUsersHandler() {
    const users = await findUsers() // Fetch all users from the User_Info model
    return users;
}
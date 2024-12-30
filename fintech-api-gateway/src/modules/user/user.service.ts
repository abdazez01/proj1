import { date } from "zod";
import prisma from "../../utils/prisma";
import {  createUserInput } from "./user.schema";
import { hashPassword } from "../../utils/hash";

export async function createUser(inputUI: createUserInput){
    
        const {HashedPassword,Email, ...rest}=inputUI;

        const hashp = await hashPassword(HashedPassword);

        const newAC= await prisma.account.create({
          data: {Email,HashedPassword:hashp},
          
        });

        const newUser = await prisma.user_Info.create({
          data: {...rest,ID:newAC.ID},
        });
        return (newUser);

}

export async function findUserByEmail(email: string) {
    return prisma.account.findUnique({
        where: {
            Email:email,
        }
});
}

export async function findUsers() {
   return prisma.user_Info.findMany();
}
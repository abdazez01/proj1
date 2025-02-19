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

export async function getUserInfo(owener_ID:number) {
  return prisma.user_Info.findFirst({
    select:{
      Account:{
        select:{
          Email:true
        }
      },
      UserName:true,
      Age:true,
      Location:true,
      Salary:true,
      Currency:true,
      Gender:true,
    },
    where:{
      ID:owener_ID
    }
  });
}

export async function getUserSalary(owener_ID:number){
  return prisma.user_Info.findFirst({
    select:{
      Salary:true,
    },
    where:{
      ID:owener_ID
    }
  });
}

export async function delUser(owener_ID:number){
  const delUsere = await prisma.user_Info.deleteMany({
    where:{
      ID:owener_ID
    }
  })

  const delAC = prisma.account.deleteMany({
    where:{ID:owener_ID}
  })

  return (delUsere);
}

export async function updateUserInfoInDatabase(ID: number, updates: Record<string, any>) {
  return prisma.user_Info.update({
      where: { ID },
      data: updates,
  });
}

export async function updateUserVerificationCode(Email:string,VerificationCode:string) {
  const VerificationExpiry = new Date(Date.now() + 15 * 60 * 1000);
  return prisma.account.update({
      where: { Email },
      data: {VerificationCode,VerificationExpiry},
  });
}

export async function updateUserVerification(Email:string,EmailVerified:boolean) {
  return prisma.account.update({
      where: { Email },
      data: {EmailVerified},
  });
}

export async function updateUserRecovryCode(Email:string,RecoveryCode:string) {
  const RecoveryExpiry = new Date(Date.now() + 15 * 60 * 1000);
  return prisma.account.update({
      where: { Email },
      data: {RecoveryCode,RecoveryExpiry,AskForRecovery:true},
  });
}

export async function updateUserPass(Email:string,HashedPassword:string) {
  return prisma.account.update({
      where: { Email },
      data: {HashedPassword,AskForRecovery:false},
  });
}
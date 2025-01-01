import { date } from "zod";
import prisma from "../../utils/prisma";

export async function delAllOCRForUser(owener_ID:number){
    return prisma.oCR.deleteMany({
        where:{Account_ID:owener_ID}
    });
  };
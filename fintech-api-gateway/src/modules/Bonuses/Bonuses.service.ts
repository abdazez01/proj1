import { date } from "zod";
import prisma from "../../utils/prisma";
import { startOfMonth, endOfMonth } from 'date-fns';
import { bonusupdate, createbonusinput } from "./Bonuses.schema";

export async function createBonus(bonusInput:createbonusinput,owener_ID:number) {
    const newBonus = await prisma.bonuses.create({
        data: {...bonusInput, Account_ID: owener_ID },
    });
    return(newBonus);
}

export async function getBonus(owener_ID:number) {
    const Bonuses = await prisma.bonuses.findMany({
        where:{
            Account_ID:owener_ID
        }
    });    
    return(Bonuses);
}

export async function getAllBonusesPrice(owner_ID: number) {
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const Bonuses = await prisma.bonuses.findMany({
        select: {
                Amount:true,
        },
        where: {
            Account_ID: owner_ID,
            createdAt: {
                gte: startOfCurrentMonth,
                lte: endOfCurrentMonth, 
            },
        },
    });
    return Bonuses;
}

export async function delAllBonusesForUser(owener_ID:number){
    return prisma.bonuses.deleteMany({
        where:{Account_ID:owener_ID}
    });
  };

  export async function delBonus(Bonus_ID:number) {
    const Bonuses = await prisma.bonuses.deleteMany({
        where:{
            Bonus_ID
        }
    });    
    return(Bonuses);
}

export async function updateBonus( updatBonus: bonusupdate, owner_ID: number) {
    const{Bonus_ID,...rest}=updatBonus
        const updatedBonus = await prisma.bonuses.updateMany({
          where: {
            Bonus_ID,
            Account_ID: owner_ID, // Ensure the expense belongs to the user
          },
          data: {...rest
          },
        });
      
        return updatedBonus;
      }
      
      
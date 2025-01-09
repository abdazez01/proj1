import { FastifyReply, FastifyRequest } from "fastify";
import { bonusupdate, createbonusinput, delBonusInput } from "./Bonuses.schema";
import { createBonus, delBonus, getBonus, updateBonus } from "./Bonuses.service";

export async function createBonusHandler(request:FastifyRequest<{
    Body : createbonusinput,
}>,reply:FastifyReply) {
    try{
    const createdBonus = await createBonus(request.body,request.user.ID);
    return reply.code(201).send(createdBonus);
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
};

export async function getBonusesHandler(request:FastifyRequest,reply:FastifyReply) {
    try{
        const allBonusesForUser = await getBonus(request.user.ID);
        if(!allBonusesForUser){
            return reply.code(401).send({
                message: "no Bonuses yet :("
            });
        }
        return reply.code(201).send(allBonusesForUser);
    }catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
};

export async function delBonusHandler(request:FastifyRequest<{Body:delBonusInput}>,reply:FastifyReply) 
{try{
const delBonuse = await delBonus(request.body.Bonus_ID);
if(delBonuse){
return reply.code(201).send({message:"Bonus deleted successfully"});  }
else{
    return reply.code(201).send({message:"Bonus deleted unsuccessfully"});  
}
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function updateBonusHandler(request:FastifyRequest<{Body:bonusupdate}>,reply:FastifyReply) 
{try{
const upBonus = await updateBonus(request.body,request.user.ID);
if(upBonus){
return reply.code(201).send(upBonus);}
else{
    return reply.code(201).send({message:"Bonus updated unsuccessfully"});  
}
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
}
import { FastifyReply, FastifyRequest } from "fastify";
import { createExpenseInput } from "./Expenses.schema";
import { createExpense, getExpenses } from "./Expenses.service";

export async function createExpenseHandler(request:FastifyRequest<{
    Body : createExpenseInput,
}>,reply:FastifyReply) {
    try{
    const createdExpense = await createExpense(request.body,request.user.ID);
    return reply.code(201).send(createdExpense);
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
};

export async function getExpensesHandler(request:FastifyRequest,reply:FastifyReply) {
    try{
        const allExpensesForUser = await getExpenses(request.user.ID);
        if(!allExpensesForUser){
            return reply.code(401).send({
                message: "no Expenses yet :("
            });
        }
        return reply.code(201).send(allExpensesForUser);
    }catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
};
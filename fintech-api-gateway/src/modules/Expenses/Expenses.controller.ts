import { FastifyReply, FastifyRequest } from "fastify";
import { createExpenseInput, delExpenseInput } from "./Expenses.schema";
import { createExpense, delExpens, getAllExpensesPrice, getExpenses, updateExpense } from "./Expenses.service";
import { updateExpenseInput } from "./Expenses.schema";



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



export async function delExpensHandler(request:FastifyRequest<{Body:delExpenseInput}>,reply:FastifyReply) 
{try{
const delExpense = await delExpens(request.body.Expense_ID);
if(delExpense){
return reply.code(201).send({message:"Expense deleted successfully"});  }
else{
    return reply.code(201).send({message:"Expense deleted unsuccessfully"});  
}
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function updateExpenseHandler(request:FastifyRequest<{Body:updateExpenseInput}>,reply:FastifyReply) 
{try{
const upExpense = await updateExpense(request.body,request.user.ID);
if(upExpense){
return reply.code(201).send(upExpense);}
else{
    return reply.code(201).send({message:"Expense updated unsuccessfully"});  
}
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
}

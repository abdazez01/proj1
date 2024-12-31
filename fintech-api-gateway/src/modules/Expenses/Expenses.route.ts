import { FastifyInstance } from "fastify";
import { $ref } from "./Expenses.schema";
import { createExpenseHandler, getExpensesHandler } from "./Expenses.controller";

export default async function expensesHandler(server:FastifyInstance) {
    server.post('/addExpense',{
         preHandler: [server.authenticate],
            schema:{
                body: $ref("expenseSchema"),
                response:{
                    201:$ref("expenseSchema"),
                }
            }
    
    },createExpenseHandler)

    server.get('/getExpenses',{
        preHandler: [server.authenticate],
           schema:{
               response:{
                   201:$ref("expensesResponseSchema"),
               }
           }
   
   },getExpensesHandler)

}
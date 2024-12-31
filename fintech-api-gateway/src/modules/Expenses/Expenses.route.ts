import { FastifyInstance } from "fastify";
import { $ref } from "./Expenses.schema";
import { createExpenseHandler, getExpensesHandler, salaryToExpensesHandler } from "./Expenses.controller";

export default async function expensesHandler(server:FastifyInstance) {
    server.post('/add',{
         preHandler: [server.authenticate],
            schema:{
                body: $ref("expenseSchema"),
                response:{
                    201:$ref("expenseSchema"),
                }
            }
    
    },createExpenseHandler)

    server.get('/get',{
        preHandler: [server.authenticate],
           schema:{
               response:{
                   201:$ref("expensesResponseSchema"),
               }
           }
   
   },getExpensesHandler)

   server.get('/toSalary',{preHandler: [server.authenticate],},salaryToExpensesHandler)

}
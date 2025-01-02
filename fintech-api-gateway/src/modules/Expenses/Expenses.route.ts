import { FastifyInstance } from "fastify";
import { $ref } from "./Expenses.schema";
import { createExpenseHandler, delExpensesHandler, getExpensesHandler, salaryToExpensesHandler, updateExpenseHandler } from "./Expenses.controller";

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

   server.get('/toSalary',{preHandler: [server.authenticate],
  schema:{
    response: {
      201: $ref("Tosal"),
    },
  }
   },salaryToExpensesHandler)

   server.delete('/delete',{preHandler: [server.authenticate],schema:{body:$ref("delExpenseSchema")}},delExpensesHandler)

   server.put(
    "/update",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateExpenseSchema"),
        response: {
          201: $ref("expenseSchema"),
        },
      },
    },
    updateExpenseHandler
  );
  
}
import {z} from 'zod'
import {buildJsonSchemas} from'fastify-zod'

const expenseSchema = z.object({
    ExpenseName:z.string(),
    Price:z.number(),
    createdAt:z.date()
});


const expensesResponseSchema = z.array(expenseSchema);

export type createExpenseInput = z.infer<typeof expenseSchema>;

export const {schemas:expensesSchema, $ref}= buildJsonSchemas({
expenseSchema,
expensesResponseSchema,
},{ $id: "ExpenseSchema" });
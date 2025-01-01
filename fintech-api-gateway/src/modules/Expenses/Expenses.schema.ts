import {z} from 'zod'
import {buildJsonSchemas} from'fastify-zod'

const expenseSchema = z.object({
    Expense_ID:z.number(),
    ExpenseName:z.string(),
    Price:z.number(),
    createdAt:z.date()
});

const delExpenseSchema = z.object({
    Expense_ID:z.number(),
})

const expensesResponseSchema = z.array(expenseSchema);

export type createExpenseInput = z.infer<typeof expenseSchema>;
export type delExpenseInput = z.infer<typeof delExpenseSchema>;


export const {schemas:expensesSchema, $ref}= buildJsonSchemas({
expenseSchema,
expensesResponseSchema,
delExpenseSchema
},{ $id: "ExpenseSchema" });
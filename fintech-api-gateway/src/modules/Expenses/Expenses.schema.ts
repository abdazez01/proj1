import {z} from 'zod'
import {buildJsonSchemas} from'fastify-zod'

const expenseSchema = z.object({
    ExpenseName:z.string(),
    Price:z.number(),
    createdAt:z.date(),
    Category:z.string(),
});

const delExpenseSchema = z.object({
    Expense_ID:z.number(),
})

const updateExpenseSchema = z.object({
    Expense_ID: z.number(),
    ExpenseName: z.string().optional(),
    Price: z.number().optional(),
    Category:z.string().optional(),
  });
  


const expensesResponseSchema = z.array(expenseSchema);

export type createExpenseInput = z.infer<typeof expenseSchema>;
export type delExpenseInput = z.infer<typeof delExpenseSchema>;
export type updateExpenseInput = z.infer<typeof updateExpenseSchema>;

export const {schemas:expensesSchema, $ref}= buildJsonSchemas({
expenseSchema,
expensesResponseSchema,
delExpenseSchema,
updateExpenseSchema
},{ $id: "ExpenseSchema" });
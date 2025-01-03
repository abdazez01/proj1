import {z} from 'zod'
import {buildJsonSchemas} from'fastify-zod'

const expenseSchema = z.object({
    Expense_ID: z.number(),
    ExpenseName:z.string(),
    Price:z.number(),
    createdAt:z.date(),
    Category:z.string(),
    Item_Count:z.number(),
});

const expenseccSchema = z.object({
  ExpenseName:z.string(),
  Price:z.number(),
  createdAt:z.date(),
  Category:z.string(),
  Item_Count:z.number(),
});

const delExpenseSchema = z.object({
    Expense_ID:z.number(),
})

const updateExpenseSchema = z.object({
    Expense_ID: z.number(),
    ExpenseName: z.string().optional(),
    Price: z.number().optional(),
    Category:z.string().optional(),
    Item_Count:z.number().optional(),
  });
  

  const Tosal = z.object({
    totalExpenses: z.number(),
    salary: z.number(),
    percentage:z.string(),
  });


const expensesResponseSchema = z.array(expenseSchema);

export type createExpenseInput = z.infer<typeof expenseccSchema>;
export type delExpenseInput = z.infer<typeof delExpenseSchema>;
export type updateExpenseInput = z.infer<typeof updateExpenseSchema>;

export const {schemas:expensesSchema, $ref}= buildJsonSchemas({
expenseSchema,
expensesResponseSchema,
delExpenseSchema,
updateExpenseSchema,
expenseccSchema,
Tosal
},{ $id: "ExpenseSchema" });
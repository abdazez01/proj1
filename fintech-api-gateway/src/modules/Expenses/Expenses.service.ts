import { date } from "zod";
import prisma from "../../utils/prisma";
import { createExpenseInput, updateExpenseInput } from "./Expenses.schema";
import { startOfMonth, endOfMonth } from 'date-fns';

export async function createExpense(expensesInput:createExpenseInput,owener_ID:number) {
    const newExpense = await prisma.expense.create({
        data: {...expensesInput, Account_ID: owener_ID },
    });
    return(newExpense);
}

export async function getExpenses(owener_ID:number) {
    const expenses = await prisma.expense.findMany({
        where:{
            Account_ID:owener_ID
        }
    });    
    return(expenses);
}

export async function getAllExpensesPrice(owner_ID: number) {
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const expenses = await prisma.expense.findMany({
        select: {
            Price: true,
            Item_Count: true,
            createdAt:true, 
        },
        where: {
            Account_ID: owner_ID,
            createdAt: {
                gte: startOfCurrentMonth,
                lte: endOfCurrentMonth, 
            },
        },
    });
    return expenses;
}

export async function delAllExpensesForUser(owener_ID:number){
    return prisma.expense.deleteMany({
        where:{Account_ID:owener_ID}
    });
  };

  export async function delExpenses(expense_ID:number) {
    const expenses = await prisma.expense.deleteMany({
        where:{
            Expense_ID:expense_ID
        }
    });    
    return(expenses);
}

export async function updateExpense( updatExp: updateExpenseInput, owner_ID: number) {
const{Expense_ID,...rest}=updatExp
    const updatedExpense = await prisma.expense.updateMany({
      where: {
        Expense_ID,
        Account_ID: owner_ID, // Ensure the expense belongs to the user
      },
      data: {...rest
      },
    });
  
    return updatedExpense;
  }
  
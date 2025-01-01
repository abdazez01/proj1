import { date } from "zod";
import prisma from "../../utils/prisma";
import { createExpenseInput, updateExpenseInput } from "./Expenses.schema";

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

export async function getAllExpensesPrice(owener_ID:number) {
    const expenses = await prisma.expense.findMany({
        select:{
            Price:true
        },
        where:{
            Account_ID:owener_ID
        }
    });    
    return(expenses);
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
  
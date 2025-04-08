import axios from 'axios';
import { Expense, ExpenseInput } from '../types/expense';
import BASE_URL from './apiConfig';

// Obtener gastos fijos por UID
export const getFixedExpensesByUser = async (uid: string): Promise<Expense[]> => {
    const response = await axios.get(`${BASE_URL}/fixed_expenses/${uid}`);
    return response.data;
  };
  
  // Crear gasto fijo
  export const createFixedExpense = async (expense: ExpenseInput): Promise<void> => {
    await axios.post(`${BASE_URL}/fixed_expenses`, expense);
  };
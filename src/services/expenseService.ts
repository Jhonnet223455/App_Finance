import { Expense, ExpenseInput } from '../types/expense';

import BASE_URL from './apiConfig';

// Obtener gastos por usuario (UID)
export async function getExpensesByUser(uid: string): Promise<Expense[]> {
    const res = await fetch(`${BASE_URL}/expenses/${uid}`);
    if (!res.ok) throw new Error('Error al obtener los gastos');
    return await res.json();
  }
  
  /** Crear un gasto (occasional o fijo) */
  export async function createExpense(data: ExpenseInput): Promise<{ message: string; expense: Expense }> {
    const res = await fetch(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear el gasto');
    return await res.json();
  }
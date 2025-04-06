// src/types/expense.ts

/** Lo que enviamos al backend */
export interface ExpenseInput {
    uid: string;
    description: string;
    amount: number;
    // timestamp y recurrence los maneja el backend/modelo, opcionales aquí:
    timestamp?: string;
    recurrence?: string;
  }
  
  /** Lo que recibimos del backend */
  export interface Expense extends ExpenseInput {
    id: string;
  }
  
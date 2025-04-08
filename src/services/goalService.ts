import BASE_URL from './apiConfig';
import { GoalInput, Goal } from '../types/goal';

interface CreateGoalResponse {
  message: string;
  goal: Goal;
}

// Crear una nueva meta
export async function createGoal(goal: GoalInput): Promise<CreateGoalResponse> {
  const res = await fetch(`${BASE_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error('Error al crear la meta');
  return await res.json(); // { message, goal: { ...GoalInput, id } }
}

// Obtener metas por UID
export async function getGoalsByUser(uid: string): Promise<Goal[]> {
  const res = await fetch(`${BASE_URL}/goals/${uid}`);
  if (!res.ok) throw new Error('Error al obtener metas');
  return await res.json(); // Goal[]
}

// Eliminar una meta por ID
export async function deleteGoal(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/goals/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar la meta');
  return await res.json();
}

// Actualizar una meta por ID
export async function updateGoal(
  id: string,
  updatedData: Partial<Omit<Goal, 'uid'>>
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/goals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Error al actualizar la meta');
  return await res.json();
}

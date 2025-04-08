// src/pages/Goal.tsx

import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
} from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { getGoalsByUser, createGoal, deleteGoal } from '../services/goalService';
import { GoalInput, Goal as GoalType } from '../types/goal';
import GoalForm from './GoalForm';

import './Goal.css';

const Goal: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();

  const [userId, setUserId] = useState<string | null>(null);
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [showModal, setShowModal] = useState(false);

  // 1️⃣ Detectar usuario
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) setUserId(user.uid);
    });
    return () => unsub();
  }, [auth]);

  // 2️⃣ Cuando tengamos UID, cargar metas
  useEffect(() => {
    if (userId) fetchGoals();
  }, [userId]);

  const fetchGoals = async () => {
    if (!userId) return;
    try {
      const data = await getGoalsByUser(userId);
      setGoals(data);
    } catch (err) {
      console.error('Error cargando metas:', err);
    }
  };

  // 3️⃣ Crear meta (se pasa desde GoalForm)
  const handleCreate = async (newGoal: Omit<GoalInput, 'uid'>) => {
    if (!userId) return;
    try {
      // newGoal tiene { name, description, price }
      await createGoal({ ...newGoal, uid: userId });
      setShowModal(false);
      fetchGoals();
    } catch (err) {
      console.error('Error creando meta:', err);
    }
  };

  // 4️⃣ Eliminar meta
  const handleDelete = async (id: string) => {
    try {
      await deleteGoal(id);
      fetchGoals();
    } catch (err) {
      console.error('Error eliminando meta:', err);
    }
  };

  // Sumar precios
  const total = goals.reduce((sum, g) => sum + g.price, 0);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="fixed-footer">
          <h5 className="activity-title">Goals</h5>
          <div
            className="fixed-total"
            style={{
              marginBottom: '10px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottom: '1px solid #c7c6c6',
            }}
          >
            <IonText className="activity-label">Total</IonText>
            <IonText className="activity-value">${total}</IonText>
          </div>

          <IonList className="activity-list">
            {goals.map(goal => (
              <IonItem key={goal.id} lines="none" className="activity-item">
                <IonLabel className="activity-label">
                  <div className="activity-text">
                    <IonText className="activity-name">{goal.name}</IonText>
                    <IonText className="activity-description">
                      {goal.description}
                    </IonText>
                  </div>
                </IonLabel>
                <IonText className="activity-value">${goal.price}</IonText>
                <IonIcon
                  icon={trash}
                  color="danger"
                  slot="end"
                  style={{ fontSize: '20px', padding: '8px', cursor: 'pointer' }}
                  onClick={() => handleDelete(goal.id)}
                />
              </IonItem>
            ))}
          </IonList>
          {goals.length === 0 && (
            <IonText className="activity-empty">No hay metas registradas</IonText>
          )}

        </div>
        {/* Floating button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Modal con tu formulario para crear */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <GoalForm
            onSubmit={handleCreate}
            onCancel={() => setShowModal(false)}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Goal;

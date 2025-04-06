import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonButton,
  IonModal,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Goal.css';
import GoalForm from './GoalForm';
import { add } from 'ionicons/icons';

interface Goal {
  name: string;
  description: string;
  price: number;
}

const Goal: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [userId, setUserId] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  // Duplicate declaration removed
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (userId) {
      fetchGoals();
    }
  }, [userId]);

  const fetchGoals = async () => {
    if (!userId) return;
    const goalsCollection = collection(db, "metas");
    const q = query(goalsCollection, where("uid", "==", userId));
    const snapshot = await getDocs(q);
    const data: Goal[] = snapshot.docs.map((doc) => doc.data() as Goal);
    setGoals(data);
  };

  const handleCreate = async () => {
    if (newGoal.name && newGoal.price && newGoal.description && userId) {
      const dbRef = collection(db, "metas");
      await addDoc(dbRef, {
        uid: userId,
        name: newGoal.name,
        description: newGoal.description,
        price: newGoal.price
      });
      setNewGoal({});
      setShowModal(false);
      fetchGoals(); // Recargar la lista
    }
  };


  const handleNavigate = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    (e.target as HTMLElement).blur();
    history.push('/GoalForm');
  };
  
  const total = goals.reduce((sum, item) => sum + item.price, 0);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        
         <div className="fixed-footer">
          <h5 className="activity-title">Goals</h5>
          <div className="fixed-total" style={{ marginBottom:"10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #c7c6c6" }}>
            <IonText className="activity-label">Total</IonText>
            <IonText className="activity-value" style={{ marginTop: '0px' }}>${total}</IonText>
          </div>

          <IonList className="activity-list">
            {goals.map((item, index) => (
            <IonItem lines="none" key={index} className="activity-item">
              <IonLabel className="activity-label">
                <div className="activity-text">
                  <IonText className="activity-name">{item.name}</IonText>
                  <IonText className="activity-description">{item.description}</IonText>
                </div>
              </IonLabel>
              <IonText className="activity-value">${item.price}</IonText>
            </IonItem>
          ))}
        </IonList>
        </div>  

        <IonFabButton className="floating-button">
          <IonButton className="activity-button"   onClick={handleNavigate}>
            <IonIcon icon={add} />
          </IonButton>
        </IonFabButton>



      </IonContent>
    </IonPage>
  );
};

export default Goal;

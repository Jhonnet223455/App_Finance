import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonButton,
  IonModal
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Goal.css';

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
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({});
  const [showModal, setShowModal] = useState(false);

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

  const total = goals.reduce((sum, item) => sum + item.price, 0);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h5 className="activity-title">Goals</h5>

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

        <div className="fixed-footer">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IonText className="activity-label">Total</IonText>
            <IonText className="activity-value" style={{ marginTop: '0px' }}>${total}</IonText>
          </div>

          <IonButton className="activity-button" expand="block" onClick={() => setShowModal(true)}>
            New Goal
          </IonButton>
        </div>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <div className="activity-card" style={{ padding: '20px' }}>
            <div className="form-section">
              <IonText className="activity-label">Name</IonText>
              <IonInput
                className="activity-input"
                placeholder="Add goal name"
                value={newGoal.name || ''}
                onIonChange={(e) => setNewGoal({ ...newGoal, name: e.detail.value! })}
              />
            </div>

            <div className="form-section">
              <IonText className="activity-label">Description</IonText>
              <IonInput
                className="activity-input"
                placeholder="Add goal description"
                value={newGoal.description || ''}
                onIonChange={(e) => setNewGoal({ ...newGoal, description: e.detail.value! })}
              />
            </div>

            <div className="form-section">
              <IonText className="activity-label">Price</IonText>
              <IonInput
                className="activity-input"
                type="number"
                placeholder="$0.00"
                value={newGoal.price || ''}
                onIonChange={(e) => setNewGoal({ ...newGoal, price: Number(e.detail.value) })}
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <IonButton className="activity-button" expand="block" onClick={handleCreate}>
                Save Goal
              </IonButton>
              <IonButton className="activity-button" expand="block" color="medium" onClick={() => setShowModal(false)}>
                Cancel
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Goal;

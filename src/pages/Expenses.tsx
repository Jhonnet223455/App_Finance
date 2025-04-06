import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { IonFab, IonFabButton, IonIcon,IonContent, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonButton, IonText } from "@ionic/react";
import { add } from "ionicons/icons";
import { useHistory } from 'react-router-dom';
import "./Expenses.css"; // Asegúrate de tener este archivo CSS para estilos

// Definir el tipo de gasto
interface Expense {
  id: string;
  amount: number;
  description: string;
  timestamp: Date;
  recurrence?: string; // Solo para "gastos_fijos"
}

const Expenses: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [userId, setUserId] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState<"gastos" | "gastos_fijos">("gastos");
  const history = useHistory(); 
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    // Esperar a que Firebase cargue el usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (userId) fetchExpenses();
  }, [category, userId]);

  const fetchExpenses = async () => {
    if (!userId) return;

    const expensesCollection = collection(db, category);
    const q = query(expensesCollection, where("uid", "==", userId));

    try {
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.log("No hay datos en la colección", category);
        setExpenses([]);
        return;
      }

      const data: Expense[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        console.log("Documento obtenido:", docData); // Depuración

        return {
          id: doc.id,
          amount: docData.amount || 0,
          description: docData.description || "Sin descripción",
          timestamp: docData.timestamp ? (docData.timestamp as Timestamp).toDate() : new Date(),
          recurrence: docData.recurrence || "",
        };
      });

      console.log("Gastos obtenidos:", data);
      setExpenses(data);
    } catch (error) {
      console.error("Error al obtener gastos:", error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="fixed-footer">
          <h5 className="activity-title">Bills</h5>

          <IonSegment value={category} onIonChange={(e) => setCategory(e.detail.value as any)} style={{ marginBottom: "10px" }}>
            <IonSegmentButton value="gastos">
              <IonLabel style={{ fontSize: "15px" }}>Occasional Bills</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="gastos_fijos">
              <IonLabel style={{ fontSize: "15px" }}>Monthly</IonLabel>
            </IonSegmentButton>
          </IonSegment>

      
          <IonList className="activity-list">
            {expenses.length > 0 ? (
              expenses.map((item) => (
                <IonItem lines="none" key={item.id} className="activity-item">
                  <IonLabel className="activity-label">
                    <div className="activity-text">
                      <IonText className="activity-name">{item.description}</IonText>
                      <IonText className="activity-description">{item.timestamp.toLocaleString()}</IonText>
                      {category === "gastos_fijos" && item.recurrence && (
                        <IonText className="activity-description">Recurrencia: {item.recurrence}</IonText>
                      )}
                    </div>
                  </IonLabel>
                  <IonText className="activity-value">${item.amount.toFixed(2)}</IonText>
                </IonItem>
              ))
            ) : (
              <IonItem lines="none" className="activity-item">
                <IonLabel>No hay {category === "gastos" ? "gastos" : "gastos fijos"} registrados.</IonLabel>
              </IonItem>
            )}
          </IonList>
        </div>

        <IonFabButton className="floating-button">
          <IonButton className="activity-button" onClick={() => history.push('/bills')}>
            <IonIcon icon={add} />
          </IonButton>
        </IonFabButton>
      </IonContent>
    </IonPage>
  );
};

export default Expenses;

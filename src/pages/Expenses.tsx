import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { IonFab, IonFabButton, IonIcon,IonContent, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton } from "@ionic/react";
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
      <IonContent>
        <h2 className="title">Mis Gastos</h2>

        <IonSegment value={category} onIonChange={(e) => setCategory(e.detail.value as "gastos" | "gastos_fijos")}>
          <IonSegmentButton value="gastos">
            <IonLabel>Gastos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="gastos_fijos">
            <IonLabel>Gastos Fijos</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <IonItem key={expense.id}>
                <IonLabel>
                  <h2>{expense.description}</h2>
                  <p>${expense.amount.toFixed(2)}</p>
                  <p>{expense.timestamp.toLocaleString()}</p>
                  {category === "gastos_fijos" && expense.recurrence && <p>Recurrencia: {expense.recurrence}</p>}
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No hay {category === "gastos" ? "gastos" : "gastos fijos"} registrados.</IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary" onClick={() => history.push('/bills')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Expenses;

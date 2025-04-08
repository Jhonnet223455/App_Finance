// src/pages/Expenses.tsx

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import { getExpensesByUser } from "../services/expenseService";
import { getFixedExpensesByUser } from "../services/fixedExpensesService";
import { Expense } from "../types/expense";
import "./Expenses.css";

const Expenses: React.FC = () => {
  const auth = getAuth();
  const history = useHistory();

  const [userId, setUserId] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState<"gastos" | "gastos_fijos">("gastos");

  // 1️⃣ Detectar usuario
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsub();
  }, [auth]);

  // 2️⃣ Cuando tengamos UID, cargar todos los gastos
  useIonViewWillEnter(() => {
    if (userId) fetchExpenses();
  }, [userId]);

  const fetchExpenses = async () => {
    if (!userId) return;
    try {
      const [ocasionales, fijos] = await Promise.all([
        getExpensesByUser(userId),
        getFixedExpensesByUser(userId),
      ]);
      setExpenses([...ocasionales, ...fijos]);
    } catch (err) {
      console.error("Error cargando gastos:", err);
    }
  };
  

  // 3️⃣ Filtrar por categoría: 
  //    - "gastos": sin recurrence
  //    - "gastos_fijos": con recurrence
  const displayed = expenses.filter(e =>
    category === "gastos" ? !e.recurrence : !!e.recurrence
  );

  const total = displayed.reduce((sum, e) => sum + e.amount, 0);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="fixed-footer">
          <h5 className="activity-title">Bills</h5>

          <IonSegment
            value={category}
            onIonChange={e => setCategory(e.detail.value as any)}
            style={{ marginBottom: "10px" }}
          >
            <IonSegmentButton value="gastos">
              <IonLabel style={{ fontSize: "15px" }}>Occasional Bills</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="gastos_fijos">
              <IonLabel style={{ fontSize: "15px" }}>Monthly</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonList className="activity-list">
            {displayed.length > 0 ? (
              displayed.map(item => (
                <IonItem
                  lines="none"
                  key={item.id}
                  className="activity-item"
                >
                  <IonLabel className="activity-label">
                    <div className="activity-text">
                      <IonText className="activity-name">
                        {item.description}
                      </IonText>
                      <IonText className="activity-description">
                        {new Date(item.timestamp!).toLocaleString()}
                      </IonText>
                      {category === "gastos_fijos" && (
                        <IonText className="activity-description">
                          Recurrence: {item.recurrence}
                        </IonText>
                      )}
                    </div>
                  </IonLabel>
                  <IonText className="activity-value">
                    ${item.amount.toFixed(2)}
                  </IonText>
                </IonItem>
              ))
            ) : (
              <IonItem lines="none" className="activity-item">
                <IonLabel>
                  No hay{" "}
                  {category === "gastos" ? "gastos" : "gastos fijos"} registrados.
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton className="activity-button" onClick={() => history.push("/bills")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Expenses;

// src/pages/Bills.tsx

import { useState } from "react";
import { getAuth } from "firebase/auth";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import { createExpense } from "../services/expenseService";
import { createFixedExpense } from "../services/fixedExpensesService"; // ← importa el service de fijos
import { ExpenseInput } from "../types/expense";

const Bills: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const history = useHistory();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"gastos" | "gastos_fijos">("gastos");
  const [recurrence, setRecurrence] = useState("");

  const handleSave = async () => {
    if (!user) {
      alert("Usuario no autenticado");
      return;
    }
    if (!amount || !description || (category === "gastos_fijos" && !recurrence)) {
      alert("Completa todos los campos");
      return;
    }

    // Prepara el payload común
    const payload: ExpenseInput = {
      uid: user.uid,
      amount: parseFloat(amount),
      description,
      // recurrence solo si es gasto fijo
      ...(category === "gastos_fijos" && { recurrence }),
    };

    try {
      if (category === "gastos_fijos") {
        // Llama al endpoint de gastos fijos
        await createFixedExpense(payload);
      } else {
        // Llama al endpoint de gastos ocasionales
        await createExpense(payload);
      }

      alert("Gasto guardado exitosamente");
      // Limpia el formulario
      setAmount("");
      setDescription("");
      setRecurrence("");
      // Vuelve a la lista
      history.push("/expenses");
    } catch (err) {
      console.error("Error al guardar gasto:", err);
      alert("No se pudo guardar el gasto");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push("/expenses")}>
              Volver
            </IonButton>
          </IonButtons>
          <IonTitle>Register Expense</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="register-in-container">
        <h2 className="title">Register Expense</h2>
        <p className="subtitle">Add your expense</p>

        <IonList>
          <IonItem>
            <IonLabel position="stacked">Amount</IonLabel>
            <IonInput
              type="number"
              value={amount}
              onIonInput={e => setAmount(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonInput
              type="text"
              value={description}
              onIonInput={e => setDescription(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Type</IonLabel>
            <select
              value={category}
              onChange={e =>
                setCategory(e.target.value as "gastos" | "gastos_fijos")
              }
            >
              <option value="gastos">Occasional</option>
              <option value="gastos_fijos">Monthly</option>
            </select>
          </IonItem>
          {category === "gastos_fijos" && (
            <IonItem>
              <IonLabel position="stacked">Recurrence</IonLabel>
              <IonInput
                type="text"
                value={recurrence}
                onIonInput={e => setRecurrence(e.detail.value!)}
              />
            </IonItem>
          )}
        </IonList>

        <IonButton
          expand="full"
          onClick={handleSave}
          className="continue-button-2"
        >
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Bills;

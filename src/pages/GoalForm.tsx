// src/pages/GoalForm.tsx

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle
} from "@ionic/react";
import { useHistory } from 'react-router-dom';
import { GoalInput } from "../types/goal";

interface GoalFormProps {
  /** Se llama con { name, description, price } (sin uid) */
  onSubmit?: (goalData: Omit<GoalInput, 'uid'>) => Promise<void>;
  /** Se llama al cancelar o al cerrar */
  onCancel?: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, onCancel }) => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const history = useHistory();

  const handleSave = async () => {
    if (!user) {
      alert("Usuario no autenticado");
      return;
    }

    console.log("Guardando meta:", { name, description, price });
    if (!name && !description && !price) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const payload: Omit<GoalInput, 'uid'> = {
      name,
      description,
      price: parseFloat(price),
    };

    try {
      if (onSubmit) {
        // Lógica externa (desde el padre)
        await onSubmit(payload);
      } else {
        // Fallback: guardar directo en Firestore
        await addDoc(collection(db, "metas"), {
          uid: user.uid,
          ...payload
        });
      }

      alert("Meta guardada exitosamente");
      setName("");
      setDescription("");
      setPrice("");

      // Cerrar modal o volver a lista
      if (onCancel) onCancel();
      else history.push("/goal");
    } catch (error) {
      console.error("Error al guardar la meta: ", error);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else history.push("/goal");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleCancel}>
              Volver
            </IonButton>
          </IonButtons>
          <IonTitle>Registrar Meta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="register-in-container">
        <h2 className="title">Registrar Meta</h2>
        <p className="subtitle">Añade una nueva meta</p>

        <IonList>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              type="text"
              value={name}
              onIonInput={e => setName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput
              type="text"
              value={description}
              onIonInput={e => setDescription(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Precio</IonLabel>
            <IonInput
              type="number"
              value={price}
              onIonInput={e => setPrice(e.detail.value!)}
            />
          </IonItem>
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

export default GoalForm;

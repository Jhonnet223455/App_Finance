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

const GoalForm: React.FC = () => {
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

    if (!name || !description || !price) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const goalData = {
      uid: user.uid,
      name,
      description,
      price: parseFloat(price)
    };

    try {
      await addDoc(collection(db, "metas"), goalData);
      alert("Meta guardada exitosamente");
      setName("");
      setDescription("");
      setPrice("");
      history.push("/goal"); // Regresar a la lista de metas
    } catch (error) {
      console.error("Error al guardar la meta: ", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/goal')}>
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
            <IonInput type="text" value={name} onIonChange={(e) => setName(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput type="text" value={description} onIonChange={(e) => setDescription(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Precio</IonLabel>
            <IonInput type="number" value={price} onIonChange={(e) => setPrice(e.detail.value!)} />
          </IonItem>
        </IonList>

        <IonButton expand="full" onClick={handleSave} className="continue-button-2">
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GoalForm;

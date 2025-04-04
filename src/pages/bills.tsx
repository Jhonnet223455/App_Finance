import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { IonPage, IonContent,IonButton, IonInput, IonItem, IonLabel, IonList, IonHeader, IonToolbar, IonButtons,  IonTitle } from "@ionic/react";
import { useHistory } from 'react-router-dom';

const Bills: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Gasto"); // "Gasto" o "Gasto Fijo"
  const [recurrence, setRecurrence] = useState(""); // Para la recurrencia del gasto fijo
  const history = useHistory();

  const handleSave = async () => {
    if (!user) {
      alert("Usuario no autenticado");
      return;
    }


    const data = {
      uid: user.uid,
      amount: parseFloat(amount),
      description,
      timestamp: new Date(),
      ...(category === "Gasto Fijo" && { recurrence }), // Agregar solo si es gasto fijo
    };

    const collectionName = category === "Gasto" ? "gastos" : "gastos_fijos";

    try {
      await addDoc(collection(db, collectionName), data);
      alert("Registro guardado exitosamente");
      setAmount("");
      setDescription("");
      setRecurrence("");
    } catch (error) {
      console.error("Error al guardar: ", error);
    }
  };

  return (
    <IonPage>
        <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                  <IonButton onClick={() => history.push('/expenses')}>
                    Volver
                  </IonButton>
                  </IonButtons>
                  <IonTitle>Register</IonTitle>
                </IonToolbar>
              </IonHeader>
      <IonContent className="register-in-container">
        <h2 className="title">Registrar Gasto</h2>
        <p className="subtitle">Añade un gasto o gasto fijo</p>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Monto</IonLabel>
            <IonInput type="number" value={amount} onIonChange={(e) => setAmount(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput type="text" value={description} onIonInput={(e: CustomEvent) => setDescription(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel>Tipo</IonLabel>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Gasto">Gasto</option>
              <option value="Gasto Fijo">Gasto Fijo</option>
            </select>
          </IonItem>
          {category === "Gasto Fijo" && (
            <IonItem>
              <IonLabel position="stacked">Recurrencia</IonLabel>
              <IonInput type="text" value={recurrence}onIonInput={(e: CustomEvent) => setRecurrence(e.detail.value!)}/>
            </IonItem>
          )}
        </IonList>
        <IonButton expand="full" onClick={handleSave} className="continue-button-2">
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Bills;

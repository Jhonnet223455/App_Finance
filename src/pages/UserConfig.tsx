import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonText,
    IonButtons
  } from '@ionic/react';
  import { logOutOutline, arrowBackOutline } from 'ionicons/icons';
  import { signOut } from "firebase/auth";
  import { auth } from "../config/firebaseConfig";
  import { useHistory } from "react-router-dom";
  
  const UserConfig: React.FC = () => {
    const history = useHistory();
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        history.push("/signin");
      } catch (error) {
        console.error("Logout failed", error);
        alert("Error al cerrar sesión");
      }
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => history.goBack()}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>Configuración</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          <IonText className="ion-margin-bottom">
            <h2>Configuración del Usuario</h2>
          </IonText>
  
          {/* Puedes agregar aquí opciones como cambiar contraseña, correo, etc. */}
  
          <IonButton expand="block" color="danger" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" />
            Cerrar Sesión
          </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default UserConfig;
  
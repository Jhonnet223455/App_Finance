import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonList, IonButton
  } from '@ionic/react';
  
  const GoalForm: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Create Goal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput placeholder="Add goal name" />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput placeholder="Goal description" />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Amount</IonLabel>
              <IonInput type="number" value={0} />
            </IonItem>
          </IonList>
          <IonButton expand="block" className="ion-margin-top">Create Goal</IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default GoalForm;
  
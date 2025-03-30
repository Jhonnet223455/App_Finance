import { IonPage, IonContent } from '@ionic/react';

const Notification: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <img src="/assets/notification.png" alt="Notification" style={{ width: '100%' }} />
      </IonContent>
    </IonPage>
  );
};

export default Notification;

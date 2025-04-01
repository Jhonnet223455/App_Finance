import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText
} from "@ionic/react";
import "./Activities.css";

const Activities: React.FC = () => {
  const logs = [
    { title: "McDonalds Combo", time: "4 hours ago", value: "10$" },
    { title: "Subway Ticket", time: "1d ago", value: "2$" },
    { title: "Phone Bill", time: "2 hours ago", value: "15$" },
  ];

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2 className="activity-title">Activity</h2>
        <button className="history-button">History</button>

        <IonList className="activity-list">
          {logs.map((log, index) => (
            <IonItem lines="none" key={index} className="activity-item">
              <span className="activity-dot" />
              <IonLabel className="activity-label">
                <div className="activity-title-row">
                  <IonText className="activity-name">{log.title}</IonText>
                  <IonText className="activity-time">{log.time}</IonText>
                </div>
                <IonText className="activity-value">{log.value}</IonText>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Activities;

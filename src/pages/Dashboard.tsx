import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButtons,
  IonButton,
  IonAvatar,
  IonText
} from '@ionic/react';
import { menuOutline, logOutOutline } from 'ionicons/icons';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useHistory } from "react-router-dom";
import './Dashboard.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { day: '23', value: 30000 },
  { day: '24', value: 31000 },
  { day: '25', value: 33000 },
  { day: '26', value: 35000 },
  { day: '27', value: 37000 },
  { day: '28', value: 39000 },
  { day: '29', value: 42000 },
  { day: '30', value: 47000 }
];

const Dashboard: React.FC = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      history.push("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className="dashboard-title">App name</IonTitle>
          <IonButtons slot="end">
            <IonAvatar>
              <img src="/public/profile.jpg" alt="Profile" />
            </IonAvatar>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="metrics">
          <div className="metric-card">
            <IonText className="metric-title">Amount</IonText>
            <IonText className="metric-value"> $45,678.90</IonText>
          </div>
          <div className="metric-card">
            <IonText className="metric-title">Day Expenses</IonText>
            <IonText className="metric-value"> 2,405</IonText>
          </div>
        </div>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Title</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#007aff"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Principal Expenses</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ul className="expense-list">
              <li>Food</li>
              <li>Transport</li>
              <li>Bills</li>
            </ul>
          </IonCardContent>
        </IonCard>

        {/* Botón de Logout en la parte inferior izquierda */}
        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
          <IonButton color="danger" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" />
            Logout
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

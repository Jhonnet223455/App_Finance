import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { statsChartOutline, listOutline, trophyOutline } from 'ionicons/icons';

import AddGoal from './pages/AddGoal';
import Notification from './pages/Notification';
import GoalForm from './pages/GoalForm';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import SignIn from './pages/SignIn';
import Goal from './pages/Goal';
import Register from './pages/Register';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Rutas que no deben tener los tabs */}
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Register} />
        
        {/* Rutas con tabs */}
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/add-goal" component={AddGoal} />
            <Route exact path="/notification" component={Notification} />
            <Route exact path="/goal-form" component={GoalForm} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/goal" component={Goal} />
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon icon={statsChartOutline} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
            <IonTabButton tab="goal" href="/goal">
              <IonIcon icon={trophyOutline} />
              <IonLabel>Goals</IonLabel>
            </IonTabButton>
            <IonTabButton tab="activities" href="/activities">
              <IonIcon icon={listOutline} />
              <IonLabel>Activity</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

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

import { addOutline, statsChartOutline, listOutline, personCircleOutline, trophyOutline } from 'ionicons/icons';


import AddGoal from './pages/AddGoal';
import Notification from './pages/Notification';
import GoalForm from './pages/GoalForm';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import SignIn from './pages/SignIn';
import Goal from './pages/Goal';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/add-goal" component={AddGoal} />
          <Route exact path="/notification" component={Notification} />
          <Route exact path="/goal-form" component={GoalForm} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/activities" component={Activities} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/goal" component={Goal} />
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          {/* <IonTabButton tab="add-goal" href="/add-goal">
            <IonIcon icon={addOutline} />
            <IonLabel>Add</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={statsChartOutline} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="goal" href="/goal">
            <IonIcon icon={trophyOutline} />
            <IonLabel>Goals</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="signin" href="/signin">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Login</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="activities" href="/activities">
            <IonIcon icon={listOutline} />
            <IonLabel>Activity</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

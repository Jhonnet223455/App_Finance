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
// al inicio del archivo
import AppInitializer from './components/AppInitializer';
import { statsChartOutline, listOutline, trophyOutline } from 'ionicons/icons';


import GoalForm from './pages/GoalForm';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import Goal from './pages/Goal';
import Register from './pages/Register';
import UserProfileSetup from './pages/UserProfileSetup';
import UserConfig from './pages/UserConfig';
import Bills from './pages/bills';
import Expenses from './pages/Expenses';

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
    <AppInitializer>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Rutas que no deben tener los tabs */}
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user-profile-setup" component={UserProfileSetup} />

        
        {/* Rutas con tabs */}
        <IonTabs>
          <IonRouterOutlet>
          <Route path="/user-config" component={UserConfig} exact />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/goal" component={Goal} />
            <Route exact path="/bills" component={Bills} />
            <Route exact path="/expenses" component={Expenses} />
            <Route exact path="/GoalForm" component={GoalForm} /> 

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
            {/* <IonTabButton tab="activities" href="/activities">
              <IonIcon icon={listOutline} />
              <IonLabel>Activity</IonLabel>
            </IonTabButton> */}
            <IonTabButton tab="bills" href="/expenses">
              <IonIcon icon={listOutline} />
              <IonLabel>Bills</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonRouterOutlet>
    </IonReactRouter>
    </AppInitializer>
  </IonApp>
);

export default App;

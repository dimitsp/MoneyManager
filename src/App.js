import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MoneyManager from './components/MoneyManager';
import BalanceHistory from './components/BalanceHistory';
import React from 'react';
import { home, document} from 'ionicons/icons';
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
import './theme/App.css'
setupIonicReact();

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
          <MoneyManager />
        
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/balance-history" render={() => <BalanceHistory />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">

          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="balance-history" href="/balance-history">
            <IonIcon icon={document} />
            <IonLabel >Balance History</IonLabel>
          </IonTabButton>
          </IonTabBar>
          </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

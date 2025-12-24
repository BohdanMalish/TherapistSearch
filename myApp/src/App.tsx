import { IonApp, IonContent, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { Routes } from './pages';
import { ErrorBoundary } from './components/ErrorBoundary';
import './normalize.css';

setupIonicReact();

const App: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <IonContent>
              <Routes />
            </IonContent>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  </ErrorBoundary>
);

export default App;

import { Component, ReactNode } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <IonPage>
          <IonContent className="ion-padding">
            <div className="error-boundary-container">
              <h2>Something went wrong</h2>
              <p>Please try again later</p>
            </div>
          </IonContent>
        </IonPage>
      );
    }

    return this.props.children;
  }
}


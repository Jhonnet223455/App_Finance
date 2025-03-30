import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonIcon
} from '@ionic/react';
import { logoGoogle, logoApple } from 'ionicons/icons';
import './SignIn.css';

const SignIn: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding sign-in-container">
        <h1 className="title">NAME</h1>
        <p className="subtitle">Create an account</p>
        <p className="description">Enter your email to sign up for this app</p>

        <IonInput
          className="email-input"
          type="email"
          placeholder="email@domain.com"
        ></IonInput>

        <IonButton expand="block" className="continue-button">
          Continue
        </IonButton>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        <IonButton expand="block" fill="outline" className="provider-button google">
          <IonIcon icon={logoGoogle} slot="start" />
          Continue with Google
        </IonButton>

        <IonButton expand="block" fill="outline" className="provider-button apple">
          <IonIcon icon={logoApple} slot="start" />
          Continue with Apple
        </IonButton>

        <IonText className="terms">
          <small>
            By clicking continue, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>
          </small>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;

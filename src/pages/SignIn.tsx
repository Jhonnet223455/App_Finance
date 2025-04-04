// src/pages/SignIn.js

import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText, IonIcon } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { useHistory } from 'react-router-dom'; // Importamos useHistory para redirigir
import './SignIn.css';
import { doc, getDoc, setDoc } from "firebase/firestore"; // Importar Firestore

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Hook para manejar la navegación

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verificar si el usuario ya tiene un perfil en Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      history.push("/dashboard"); // Si ya tiene perfil, ir al dashboard
    } else {
      history.push("/user-profile-setup"); // Si no tiene perfil, ir a completarlo
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed! Please check your credentials.");
  }
};

const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verificar si el usuario ya tiene un perfil en Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Si el usuario ya existe, ir al dashboard
      history.push("/dashboard");
    } else {
      // Si es un usuario nuevo, guardarlo en Firestore y redirigirlo a la configuración del perfil
      const userProfile = {
        fullName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "default-profile.png",
      };

      await setDoc(userDocRef, userProfile);
      history.push("/user-profile-setup");
    }
  } catch (error) {
    console.error("Error with Google login:", error);
    alert("Google login failed! Try again.");
  }
};



  return (
    <IonPage>
      <IonContent className="ion-padding sign-in-container">
        <h1 className="title1">Finance App</h1>
        <h1 className="title">Sign In</h1>

        <IonInput
          className="input-field"
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
          placeholder="email@domain.com"
        ></IonInput>

        <IonInput
          className="input-field"
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
          placeholder="Enter password"
        ></IonInput>

        <IonButton expand="block" className="continue-button" onClick={handleLogin}>
          Sign In
        </IonButton>

        <IonButton expand="block" fill="outline" className="provider-button google" onClick={handleGoogleLogin}>
          <IonIcon icon={logoGoogle} slot="start" />
          Continue with Google
        </IonButton>

        <IonButton expand="block" fill="clear" className="register-button" onClick={() => history.push('/register')}>
          Don't have an account? Register
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

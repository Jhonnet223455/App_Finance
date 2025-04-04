// src/pages/Register.js

import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText, IonIcon, IonHeader, IonToolbar, IonButtons,  IonTitle } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory(); // Hook para manejar la navegación

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential);
  
      alert("Registration successful!");
      history.push("/user-profile-setup"); // Redirigir a la configuración de perfil
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed! Please try again.");
    }
  };
  

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <IonPage>

      {/* Agregado un IonHeader con un botón de regreso */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonButton onClick={() => history.push('/signin')}>
            Volver
          </IonButton>
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding register-in-container">
        <h1 className="title">Register</h1>
        <p className="subtitle">Create a new account</p>

        <IonInput
          className="input-field"
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
          placeholder="email@domain.com"
        ></IonInput>


        <div className="password-container">
          <IonInput
            className="input-field password-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            placeholder="Enter password"
          ></IonInput>
          <button
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            <IonIcon icon={showPassword ? eyeOff : eye} />
          </button>
        </div>

        <div className="password-container">
          <IonInput
            className="input-field password-input"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            placeholder="Confirm password"
          ></IonInput>
          <button
            className="toggle-password"
            onClick={toggleConfirmPasswordVisibility}
          >
            <IonIcon icon={showConfirmPassword ? eyeOff : eye} />
          </button>
        </div>

        <IonButton expand="block" className="continue-button-2" onClick={handleRegister}>
          Register
        </IonButton>

        <IonText className="terms">
          <small>
            By clicking register, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>
          </small>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Register;

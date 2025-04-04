import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import './UserProfileSetup.css';

const UserProfileSetup = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const history = useHistory();

  const handleSaveProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('No user logged in');
      return;
    }
  
    const userProfile = {
      fullName,
      phoneNumber,
      country,
      monthlyIncome,
      birthDate,
      gender,
      photoURL: user.photoURL || 'default-profile.png',
    };
  
    try {
      await setDoc(doc(db, 'users', user.uid), userProfile);
      console.log('Profile saved successfully:', userProfile); // Muestra los datos guardados en la consola
      alert('Profile saved successfully!');
      history.push('/dashboard'); // Redirigir a la página principal
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    }
  };
  
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Complete Your Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput placeholder="Full Name" value={fullName} onIonChange={e => setFullName(e.detail.value!)} />
        <IonInput placeholder="Phone Number" type="tel" value={phoneNumber} onIonChange={e => setPhoneNumber(e.detail.value!)} />
        <IonInput placeholder="Country" value={country} onIonChange={e => setCountry(e.detail.value!)} />
        <IonInput placeholder="Estimated Monthly Income" type="number" value={monthlyIncome} onIonChange={e => setMonthlyIncome(e.detail.value!)} />
        <IonInput placeholder="Birth Date" type="date" value={birthDate} onIonChange={e => setBirthDate(e.detail.value!)} />
        <IonSelect placeholder="Gender" value={gender} onIonChange={e => setGender(e.detail.value!)}>
          <IonSelectOption value="male">Male</IonSelectOption>
          <IonSelectOption value="female">Female</IonSelectOption>
          <IonSelectOption value="other">Other</IonSelectOption>
        </IonSelect>
        <IonButton expand="block" onClick={handleSaveProfile}>Save Profile</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UserProfileSetup;

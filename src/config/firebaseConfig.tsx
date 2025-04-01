// Importa Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase (reemplaza con tu configuración)
const firebaseConfig = {
    apiKey: "AIzaSyBfjDAT_12D8yd1PFp91KGahQ5gVYVcjTc",
    authDomain: "emprendimiento-ed100.firebaseapp.com",
    projectId: "emprendimiento-ed100",
    storageBucket: "emprendimiento-ed100.firebasestorage.app",
    messagingSenderId: "520905501969",
    appId: "1:520905501969:web:a4561a4b628e2bb99b30b0",
    measurementId: "G-LSQBS0E9F4"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// src/firebase.js
import { initializeApp } from "firebase/app";

// 1. Ve a la consola de Firebase -> Configuración del Proyecto -> General
// 2. Baja hasta "Tus apps" -> Selecciona "Web" (</>)
// 3. Copia el objeto 'firebaseConfig' que te dan y pégalo aquí:

const firebaseConfig = {
  apiKey: "AIzaSyBkUtdZCKR3AxY39Pu-4jodWoORfeJaXng",
  authDomain: "droscar-71185.firebaseapp.com",
  projectId: "droscar-71185",
  storageBucket: "droscar-71185.firebasestorage.app",
  messagingSenderId: "1071858599536",
  appId: "1:1071858599536:web:5efca4b4c642c8fd9dd6b5",
  measurementId: "G-J9DF40E80T"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la app para usarla en los componentes
export { app };
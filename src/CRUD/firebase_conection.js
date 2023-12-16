import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDloelSJfu35MuofY4pPeOHu5P-as61GLc",
  authDomain: "dw2-proyecto.firebaseapp.com",
  projectId: "dw2-proyecto",
  storageBucket: "dw2-proyecto.appspot.com",
  messagingSenderId: "717007061547",
  appId: "1:717007061547:web:079e28dd6008f77d30206e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
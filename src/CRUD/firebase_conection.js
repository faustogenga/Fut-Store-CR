import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsHv8xg_dLRKXFMoElKI-KBcmxbk_UftU",
  authDomain: "dw-futstore.firebaseapp.com",
  projectId: "dw-futstore",
  storageBucket: "dw-futstore.appspot.com",
  messagingSenderId: "86901056105",
  appId: "1:86901056105:web:9c043154f1c48bb7a5b8f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
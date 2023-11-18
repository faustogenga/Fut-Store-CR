import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Aa-blH9dsUfJ9cZMKQeU4DXyNbAUvT0",
  authDomain: "dw---base-de-datos.firebaseapp.com",
  projectId: "dw---base-de-datos",
  storageBucket: "dw---base-de-datos.appspot.com",
  messagingSenderId: "692244881069",
  appId: "1:692244881069:web:123bc7b8ac6fe45d98f024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
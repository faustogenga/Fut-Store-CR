import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBDDDQ9ai8qmiE_7qUloj1a5q54Gr1fZk",
  authDomain: "dwii-fb3da.firebaseapp.com",
  projectId: "dwii-fb3da",
  storageBucket: "dwii-fb3da.appspot.com",
  messagingSenderId: "300929602559",
  appId: "1:300929602559:web:19979c0d4a964e7d3a8dca",
  measurementId: "G-LLPXQKJZW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
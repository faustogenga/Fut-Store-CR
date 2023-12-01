import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaBkhZE_7crOYIqlDH91kgQAsFznhHrLU",
  authDomain: "reactcrud-40423.firebaseapp.com",
  projectId: "reactcrud-40423",
  storageBucket: "reactcrud-40423.appspot.com",
  messagingSenderId: "288695004510",
  appId: "1:288695004510:web:7eeb951f49ba7399b873cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
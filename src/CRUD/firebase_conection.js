import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBHo6zQuPybczMvmmn9JrPSEY3OUe9Kj_M",
    authDomain: "nicolas-pruebas.firebaseapp.com",
    projectId: "nicolas-pruebas",
    storageBucket: "nicolas-pruebas.appspot.com",
    messagingSenderId: "1055727915848",
    appId: "1:1055727915848:web:1817fd853b817dc659d97d"
  };

  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
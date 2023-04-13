import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDJezTA-mItry0saloeffmuL4OMv3OH2_E",
  authDomain: "myquizapp-760ae.firebaseapp.com",
  projectId: "myquizapp-760ae",
  storageBucket: "myquizapp-760ae.appspot.com",
  messagingSenderId: "774861636286",
  appId: "1:774861636286:web:8b0b409613090eabfa54ef",
  measurementId: "G-12J8PQ9BJW",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

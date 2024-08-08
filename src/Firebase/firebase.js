// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF1ANz6viZlvi4iL7MC8K2XgddQptRrhE",
  authDomain: "expenseflow-f003c.firebaseapp.com",
  projectId: "expenseflow-f003c",
  storageBucket: "expenseflow-f003c.appspot.com",
  messagingSenderId: "350235583247",
  appId: "1:350235583247:web:d827debb067f4159ac147a",
  measurementId: "G-MQF15639TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

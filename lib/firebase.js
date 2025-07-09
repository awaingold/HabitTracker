// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIwqG7syoFlJMbaD7ql_Hj61uuAJ29554",
  authDomain: "habittracker-1d79f.firebaseapp.com",
  projectId: "habittracker-1d79f",
  storageBucket: "habittracker-1d79f.firebasestorage.app",
  messagingSenderId: "402357753108",
  appId: "1:402357753108:web:8b2c4fcc8f16e1d9219e01",
  measurementId: "G-ECW28NP726"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
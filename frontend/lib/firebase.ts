import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDW0NXZu5r3Py8zoz6CCiH2qS2l36sDH0I",
    authDomain: "examxpert-76843.firebaseapp.com",
    projectId: "examxpert-76843",
    storageBucket: "examxpert-76843.firebasestorage.app",
    messagingSenderId: "751877840617",
    appId: "1:751877840617:web:054bb072e953ab7d665a78",
    measurementId: "G-JGBJPDJ6Z1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

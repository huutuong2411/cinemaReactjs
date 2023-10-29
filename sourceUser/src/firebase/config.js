// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwhmbsliSPLZdxmSkaUVdUekBds-np20E",
    authDomain: "universal-chat-cinema.firebaseapp.com",
    projectId: "universal-chat-cinema",
    storageBucket: "universal-chat-cinema.appspot.com",
    messagingSenderId: "68681887003",
    appId: "1:68681887003:web:d81f420877fde82f8577be",
    measurementId: "G-1LM71KCTNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
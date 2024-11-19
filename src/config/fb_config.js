// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsHea-genvzTZPFFOiji3_lJHm3lJcH0Y",
    authDomain: "board-ca445.firebaseapp.com",
    databaseURL: "https://board-ca445-default-rtdb.firebaseio.com",
    projectId: "board-ca445",
    storageBucket: "board-ca445.firebasestorage.app",
    messagingSenderId: "555111816259",
    appId: "1:555111816259:web:94f91c5013b75d46b408f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth(app);
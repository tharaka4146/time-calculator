// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANaF8kPurL_9n5EKp2GU1dVMqnvGAnPRI",
    authDomain: "time-calculator-79ae3.firebaseapp.com",
    projectId: "time-calculator-79ae3",
    storageBucket: "time-calculator-79ae3.appspot.com",
    messagingSenderId: "796577655970",
    appId: "1:796577655970:web:09113951f491d75de27bfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
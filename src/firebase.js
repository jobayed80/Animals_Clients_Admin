// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDwexWRlGueIZQBcV29nvR84zSBt1_Q-w",
  authDomain: "medicine-reminder-a9b87.firebaseapp.com",
  projectId: "medicine-reminder-a9b87",
  storageBucket: "medicine-reminder-a9b87.appspot.com",
  messagingSenderId: "674561119303",
  appId: "1:674561119303:web:53823031278a0a457b0d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firestire = getFirestore(app);
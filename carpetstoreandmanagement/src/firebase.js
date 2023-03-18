import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'; 
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBuoK_7j9XiFMjedATgQz5HAOngZZaFa1g",
  authDomain: "carpetstoreandmanagement.firebaseapp.com",
  projectId: "carpetstoreandmanagement",
  storageBucket: "carpetstoreandmanagement.appspot.com",
  messagingSenderId: "830026621753",
  appId: "1:830026621753:web:3d5961938aa46c08083ee8"
};


const app = initializeApp(firebaseConfig); 

export const db = getFirestore(app); 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebase = {
  apiKey: "AIzaSyAqgYqgcTmKD326PpmGJiNZI07Yu_nsNDk",
  authDomain: "edupathadvisor-99773.firebaseapp.com",
  projectId: "edupathadvisor-99773",
  storageBucket: "edupathadvisor-99773.firebasestorage.app",
  messagingSenderId: "399760858389",
  appId: "1:399760858389:web:5dad391d52512ab4769d1c"
};


const app = initializeApp(firebase);

export const auth = getAuth(app);
export const db = getFirestore(app);

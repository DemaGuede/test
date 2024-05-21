import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyANMFSELVv2jXKKsiRrp34VQJ-CROwzrMQ",
  authDomain: "test-14345.firebaseapp.com",
  projectId: "test-14345",
  storageBucket: "test-14345.appspot.com",
  messagingSenderId: "451309293434",
  appId: "1:451309293434:web:604f49ef297fd859d750c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

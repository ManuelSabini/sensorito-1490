import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF_4Rnz_bkizJ6pHM2LKeDUCQPydnGVXs",
  authDomain: "sensorito-c00c7.firebaseapp.com",
  projectId: "sensorito-c00c7",
  storageBucket: "sensorito-c00c7.firebasestorage.app",
  messagingSenderId: "411715746282",
  appId: "1:411715746282:web:8429e15792c77dd49f9a93"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
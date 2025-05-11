// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQI-U8_kpIxlSOU7HxnEFMaqu28LuJf9I",
  authDomain: "contact-form-a9ddc.firebaseapp.com",
  projectId: "contact-form-a9ddc",
  storageBucket: "contact-form-a9ddc.firebasestorage.app",
  messagingSenderId: "292425971329",
  appId: "1:292425971329:web:684e4932e91d8a4e993f80"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

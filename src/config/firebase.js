// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrCyx3dtXSHyU0bHLgPw8eoL6vKiJQze0",
  authDomain: "e-com-projectdb.firebaseapp.com",
  projectId: "e-com-projectdb",
  storageBucket: "e-com-projectdb.firebasestorage.app",
  messagingSenderId: "989593766674",
  appId: "1:989593766674:web:0f2da12c36cec38c38c1cb",
  measurementId: "G-R42FELTH0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
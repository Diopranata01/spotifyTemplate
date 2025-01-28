// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkgnFpW5q4EEw4uGzXtQOP4g6tp0eY4W8",
  authDomain: "rsvp-1f8c6.firebaseapp.com",
  projectId: "rsvp-1f8c6",
  storageBucket: "rsvp-1f8c6.firebasestorage.app",
  messagingSenderId: "630685601710",
  appId: "1:630685601710:web:d98a962dd9796609c3023f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// export const auth = getAuth(app);
export { db };
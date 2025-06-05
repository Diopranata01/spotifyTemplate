// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const storageConfig = {
  apiKey: "AIzaSyCsYt8KWs5QLINEMhpjZ3wdZUfROZI24gc",
  authDomain: "new-auth-3d448.firebaseapp.com",
  projectId: "new-auth-3d448",
  storageBucket: "new-auth-3d448.appspot.com",
  messagingSenderId: "16250421680",
  appId: "1:16250421680:web:d942921adbf50d90f49675",
  measurementId: "G-85W65NW6E5",
};

// Give it a custom name
const storageApp = initializeApp(storageConfig, "storageApp");

export const storage = getStorage(storageApp);

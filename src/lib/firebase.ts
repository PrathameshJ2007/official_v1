// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore }from "firebase/firestore";

// Your web app's Firebase configuration.
const firebaseConfig = {
  "projectId": "legaleagletest-31764966-1eb27",
  "appId": "1:759171583824:web:d1b9d9a76f9398ad7f2655",
  "apiKey": "AIzaSyCeI8UVTygApx3ApUrgGVXnYwkA_DrwJSM",
  "authDomain": "legaleagletest-31764966-1eb27.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "759171583824"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);

export { app, db };

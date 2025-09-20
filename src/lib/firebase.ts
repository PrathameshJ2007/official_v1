// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore }from "firebase/firestore";

// Your web app's Firebase configuration.
const firebaseConfig = {
  "projectId": process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  "appId": process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  "apiKey": process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  "authDomain": process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  "measurementId": process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  "messagingSenderId": process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);

export { app, db };

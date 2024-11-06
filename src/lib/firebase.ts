import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// let NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyCvjrEtBCHSWP9OUhR-LEjbUfpjba292bA"
// let NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "expenseapp-cdcfe.firebaseapp.com"
// let NEXT_PUBLIC_FIREBASE_PROJECT_ID = "expenseapp-cdcfe"
// let NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "expenseapp-cdcfe.appspot.com"
// let NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "622095554406"
// let NEXT_PUBLIC_FIREBASE_APP_ID = "1:622095554406:web:9f649374024f5f907d9aa7"
// let NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "G-GVV2HS4M08"

// const firebaseConfig = {
//   apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase connection initialized.");

export { db };
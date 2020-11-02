import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.database();
const auth = firebase.auth();

// export utils/refs
export { firebase, db, auth };

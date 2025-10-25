import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDruNogAKbIrLNfmOdio5jFWY-MuddoEkg",
  authDomain: "eduline-b88df.firebaseapp.com",
  projectId: "eduline-b88df",
  storageBucket: "eduline-b88df.firebasestorage.app",
  messagingSenderId: "264209394462",
  appId: "1:264209394462:web:YOUR_APP_ID"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

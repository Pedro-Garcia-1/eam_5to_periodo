import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvZHodAVoO_J5ZBQ_yLgXuLyDW6Kf1k8o",
  authDomain: "crud-eam.firebaseapp.com",
  projectId: "crud-eam",
  storageBucket: "crud-eam.firebasestorage.app",
  messagingSenderId: "124081344508",
  appId: "1:124081344508:web:e72ceeca7cc9ef02636c79"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
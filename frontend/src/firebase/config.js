import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCt3BwNhPNFRZEW3dRZWSnMKp86kS-Fggw",
  authDomain: "ecom-store-73e7c.firebaseapp.com",
  projectId: "ecom-store-73e7c",
  storageBucket: "ecom-store-73e7c.firebasestorage.app",
  messagingSenderId: "371607926877",
  appId: "1:371607926877:web:434e61dc8422b0f7a835b4",
  measurementId: "G-2KVSZQ766M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiHZLLuqgrWUI5cAp3gRpYVapLgDPR10c",
  authDomain: "crwn-db-ed167.firebaseapp.com",
  projectId: "crwn-db-ed167",
  storageBucket: "crwn-db-ed167.appspot.com",
  messagingSenderId: "721183541737",
  appId: "1:721183541737:web:59b8bee4ccacd780d5e378"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged } from 'firebase/auth';
import {
 getFirestore,
 doc,
 getDoc,
 setDoc,
 collection,
 writeBatch,
 query,
 getDocs
} from 'firebase/firestore';

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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

// export const signInEmailPassword = (email,password) => signInWithEmailAndPassword(auth,email,password);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
} 

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);


  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());



  // return categoryMap;

}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid );
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log(error);
    }
  }
  // if data exists
   
  return userSnapshot;
  // if data does not exist

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if( !email || !password ) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInEmailPassword = async (email,password) => {
  if( !email || !password ) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener =  (callback) => {
  
  onAuthStateChanged(auth, callback);
} 

export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const unsubscribe = onAuthStateChanged(auth,
    (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    },
    reject);
  });
}
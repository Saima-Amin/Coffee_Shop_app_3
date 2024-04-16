import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import firestore, { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAtDRJ7ZYMADEGsUMG7hFZ9jcJaU2GsY5E",
  authDomain: "coffeeshopapp-39dbf.firebaseapp.com",
  projectId: "coffeeshopapp-39dbf",
  storageBucket: "coffeeshopapp-39dbf.appspot.com",
  messagingSenderId: "914328856991",
  appId: "1:914328856991:web:bbcbade54bfaf5509775aa",
  measurementId: "G-RP4LDVLEPZ"
};


  
//if(!firebase.apps.length)
//{
    //const app = firebase.initializeApp(firebaseConfig);
//}
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

export const db=getFirestore(app);

export {firebase}; 
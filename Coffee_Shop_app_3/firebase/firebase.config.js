
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIxpGmcOuqxbwWQ6fHffdcN7jG359c9OE",
  authDomain: "coffee-shop-firebase-f1b64.firebaseapp.com",
  projectId: "coffee-shop-firebase-f1b64",
  storageBucket: "coffee-shop-firebase-f1b64.appspot.com",
  messagingSenderId: "567053090727",
  appId: "1:567053090727:web:e87b560b605092a95fc082",
  measurementId: "G-M8RHM2VXE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
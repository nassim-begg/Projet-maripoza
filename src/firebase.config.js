import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBn8et8S5mFDcJgYCuHRtHc_82eQtQ8K2w",
  authDomain: "restaurantapp-d60e5.firebaseapp.com",
  databaseURL: "https://restaurantapp-d60e5-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-d60e5",
  storageBucket: "restaurantapp-d60e5.appspot.com",
  messagingSenderId: "840086223606",
  appId: "1:840086223606:web:e1b1e6e7d28d2df45ccad7",
};

// Initialize Firebase
const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const storage = firebase.storage();
const messaging = firebase.messaging(); // Initialize Firebase Messaging

export { app, firestore, storage, messaging };

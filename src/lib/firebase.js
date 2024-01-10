import firebase from 'firebase/app';
import 'firebase/firestore';  // If you're using Firestore
import 'firebase/auth';       // If you're using Authentication

const firebaseConfig = {
    apiKey: "AIzaSyDSo5LwVnxGGemhbuLabUE7ZRwDC1yBLtg",
    authDomain: "agenda-589ff.firebaseapp.com",
    projectId: "agenda-589ff",
    storageBucket: "agenda-589ff.appspot.com",
    messagingSenderId: "361127830506",
    appId: "1:361127830506:web:abdfbd7ff9ca13699a8893"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

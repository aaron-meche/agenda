import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

import { 
    getAuth, 
    signInWithRedirect,
    GoogleAuthProvider,
    getRedirectResult,
    onAuthStateChanged
} from 'firebase/auth';

// import { db } from "$lib/data"

const firebaseConfig = {
    apiKey: "AIzaSyDSo5LwVnxGGemhbuLabUE7ZRwDC1yBLtg",
    authDomain: "agenda-589ff.firebaseapp.com",
    projectId: "agenda-589ff",
    storageBucket: "agenda-589ff.appspot.com",
    messagingSenderId: "361127830506",
    appId: "1:361127830506:web:abdfbd7ff9ca13699a8893"
};

// App Base
const app = initializeApp(firebaseConfig);

// Database
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
    // Google Sign In
export function signInWithGoogle() {
    signInWithRedirect(auth, provider);
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid)
    } else {
        console.log("no user")
    }
});
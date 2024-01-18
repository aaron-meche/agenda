import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, remove } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from "$lib/data";

const firebaseConfig = {
    apiKey: "AIzaSyDSo5LwVnxGGemhbuLabUE7ZRwDC1yBLtg",
    authDomain: "agenda-589ff.firebaseapp.com",
    projectId: "agenda-589ff",
    storageBucket: "agenda-589ff.appspot.com",
    messagingSenderId: "361127830506",
    appId: "1:361127830506:web:abdfbd7ff9ca13699a8893"
};

let is_logged_in, uid
db.subscribe(data => {
    is_logged_in = data.is_logged_in
    uid = data.uid
})

// App Base
const app = initializeApp(firebaseConfig);

// Database
const database = getDatabase(app);
    // Smart User Ref
function getUserRef(path) {
    return ref(database, `users/${uid}/${path}`)
}
    // Write
export function writeData(path, value) {
    if (typeof document == "undefined") return

    set(getUserRef(path), value);
}
    // Read
export function readData(path, callback) {
    if (typeof document == "undefined") return

    get(getUserRef(path))
        .then(snapshot => callback(snapshot.val(), snapshot.exists()))
        .catch(error => {
            console.error(error)
        })
}
    // Subscribe Read
export function subscribeData(path, callback) {
    if (typeof document == "undefined") return
    
    onValue(getUserRef(path), (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val())
        }
        else {
            callback([])
        }
    })
}
    // Delete
export function deleteData(path, callback) {
    if (typeof document == "undefined") return

    remove(getUserRef(path))
        .then(() => {
            if (callback) callback()
        })
        .catch(error => {
            console.error(error)
        })
}

// Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
    // Google Sign In
export function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            handleSignIn()
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}
    // Guest Sign In
export function signInAsGuest() {
    signInAnonymously(auth)
        .then(() => {
            console.log("logged in")
            handleSignIn()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
    // Authentication Handler
function handleSignIn() {
    // readData("setup_complete", val => {
    //     if (val.length > 0) {
    //         window.open("/home-view", "_self")
    //     }
    //     else {
    //         window.open("/setup", "_self")
    //     }
    // })
}
    // Logout
export function logout() {
    signOut(auth)
    window.open("/", "_self")
}
    // Handle Accounts
onAuthStateChanged(auth, (user) => {
    if (user) {
        writeData("last-login", Date.now())
        db.update(db => {
            db.user = user
            db.is_logged_in = true
            db.uid = user.uid
            db.name = user.displayName
            return db
        })
    }
    else {
        is_logged_in = false
        uid = null
    }
});
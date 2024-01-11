import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';
import { localStore } from "$lib/data";

const firebaseConfig = {
    apiKey: "AIzaSyDSo5LwVnxGGemhbuLabUE7ZRwDC1yBLtg",
    authDomain: "agenda-589ff.firebaseapp.com",
    projectId: "agenda-589ff",
    storageBucket: "agenda-589ff.appspot.com",
    messagingSenderId: "361127830506",
    appId: "1:361127830506:web:abdfbd7ff9ca13699a8893"
};

let is_logged_in, uid

// App Base
const app = initializeApp(firebaseConfig);

// Database
const database = getFirestore(app);
    // Smart User Ref
function getUserRef(path) {
    return ref(database, `users/${uid}/${path}`)
}
    // Write
export function writeData(path, value) {
    if (!is_logged_in) return

    set(getUserRef(path), value);
}
    // Push
export function pushData(path, value) {
    if (!is_logged_in) return

    set(getUserRef(path), value);
}
    // Read
export function readData(path, callback) {
    if (!is_logged_in) return

    get(getUserRef(path))
        .then(snapshot => callback(snapshot.val(), snapshot.exists()))
        .catch(error => {
            console.error(error)
        })
}
    // Subscribe Read
export function subscribeData(path, callback) {
    if (!is_logged_in) return

    onValue(getUserRef(path), (snapshot) => callback(snapshot.val(), snapshot.exists()))
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
    let uid
    localStore.subscribe(data => {
        uid = data.uid
    })
}
    // Logout
export function logout() {
    signOut(auth)
    window.open("/", "_self")
}
    // Handle Accounts
onAuthStateChanged(auth, (user) => {
    is_logged_in = (user ? true : false)
    uid = is_logged_in ? user.uid : null

    console.log("login: " + is_logged_in)

    localStore.update(data => {
        data.logged_in = true
        data.uid = (is_logged_in ? user.uid : null)
        return data
    })
});
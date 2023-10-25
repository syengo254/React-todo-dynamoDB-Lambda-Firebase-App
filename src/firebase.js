// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCslnV63c3CNEP876JzdEkq6eA3vtZHFfo",
    authDomain: "local-dev-projects.firebaseapp.com",
    projectId: "local-dev-projects",
    storageBucket: "local-dev-projects.appspot.com",
    messagingSenderId: "689515519286",
    appId: "1:689515519286:web:3ad5f44e4fc676f331e797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export async function SignIn() {
    try {
        return await signInWithPopup(auth, provider);
    } catch (e) {
        console.log(e);
    }
}

export async function SignOut() {
    try {
        return await signOut(auth);
    } catch (e) {
        console.log(e);
    }
}

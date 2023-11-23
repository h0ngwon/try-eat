// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAitIVUmb2UlT4AoxvPfwMtw0ZuloGyWxo",
    authDomain: "pleasebe-1cfe1.firebaseapp.com",
    projectId: "pleasebe-1cfe1",
    storageBucket: "pleasebe-1cfe1.appspot.com",
    messagingSenderId: "805807962626",
    appId: "1:805807962626:web:9184537cd6b06e506d451b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp)
export const db = getFirestore(firebaseApp)
export { firebaseApp, auth, updateProfile, storage };

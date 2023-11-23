// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAuR3yllYRqqU-O7aDA00z2DDHUf6fZK_Y',
    authDomain: 'fir-test2-9cc58.firebaseapp.com',
    projectId: 'fir-test2-9cc58',
    storageBucket: 'fir-test2-9cc58.appspot.com',
    messagingSenderId: '516454141672',
    appId: '1:516454141672:web:15b894afa37e2f3cc2835d'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
export { firebaseApp, auth, updateProfile, storage, db, doc, setDoc };

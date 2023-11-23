// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyATc1AO8364B3qtiH4QNkLp68K4C1mhTh4',
    authDomain: 'fir-test-fea6e.firebaseapp.com',
    projectId: 'fir-test-fea6e',
    storageBucket: 'fir-test-fea6e.appspot.com',
    messagingSenderId: '916379241605',
    appId: '1:916379241605:web:1d711e248b357a3f7fedec'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };

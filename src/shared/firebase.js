// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'sparta-week8.firebaseapp.com',
    projectId: 'sparta-week8',
    storageBucket: 'sparta-week8.appspot.com',
    messagingSenderId: '891799028993',
    appId: '1:891799028993:web:37b42ffdb858eb53d94700',
    measurementId: 'G-3BBL12R3ED'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export {  };

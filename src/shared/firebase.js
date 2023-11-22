// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
// React에서 정상적으로 동작하는 지 확인하기 위해서 임시로 export 시켜줍니다. app이 정상적으로 출력되는 것을 확인하고 나면, 지워줍니다.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

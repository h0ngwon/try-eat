// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    // 여기 부분 수정
    apiKey: 'AIzaSyAsXpX92uLpwLh9t5FSZi4OT258q7q9yik',
    authDomain: 'sparta-teamproject.firebaseapp.com',
    projectId: 'sparta-teamproject',
    storageBucket: 'sparta-teamproject.appspot.com',
    messagingSenderId: '617798694319',
    appId: '1:617798694319:web:737b06eefba79c4c6f6b5a'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
export { firebaseApp, auth, updateProfile, storage, doc, setDoc };

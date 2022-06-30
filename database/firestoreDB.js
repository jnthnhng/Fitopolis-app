// database/firebaseDb.js
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCm7aNK4pL-gHR_0dal40p6viwRu3Lw6V0",
    authDomain: "fitopolis-72025.firebaseapp.com",
    projectId: "fitopolis-72025",
    storageBucket: "fitopolis-72025.appspot.com",
    messagingSenderId: "672295851701",
    appId: "1:672295851701:web:578e4f7a83aa834d4b50fc",
    measurementId: "G-DZK3LR9P9G"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
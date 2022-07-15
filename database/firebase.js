// database/firebase.js
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import { getDatabase, ref, set } from 'firebase/database';
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAG5GGp0Wern5S_csT1XjON16agISgX1ZY',

  authDomain: 'fitopolis-app.firebaseapp.com',

  databaseURL: 'https://fitopolis-app-default-rtdb.firebaseio.com',

  projectId: 'fitopolis-app',

  storageBucket: 'fitopolis-app.appspot.com',

  messagingSenderId: '798338284162',

  appId: '1:798338284162:web:22baa386f3d64ccadc129b',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = firebase.storage;
// const auth = getAuth();

export { db, storage, firebaseConfig };

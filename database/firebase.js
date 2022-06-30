// database/firebase.js
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCm7aNK4pL-gHR_0dal40p6viwRu3Lw6V0",
    authDomain: "fitopolis-72025.firebaseapp.com",
    projectId: "fitopolis-72025",
    storageBucket: "fitopolis-72025.appspot.com",
    messagingSenderId: "672295851701",
    appId: "1:672295851701:web:578e4f7a83aa834d4b50fc",
    measurementId: "G-DZK3LR9P9G"
};

const app = initializeApp(firebaseConfig);

/*
function writeUserData(userId, userName, email, challangesCompleted, challengesCreated) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    set(reference, {
        userName: name,
        email: email,
        challangesCompleted: challangesCompleted,
        challengesCreated: challengesCreated
    });
}

writeUserData("doge", "no@test.com", 0, 0);
*/
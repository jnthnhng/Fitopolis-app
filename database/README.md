// database imports for each screen needing database
import { db } from '../database/firebase.js';
import {
    ref,
    onValue,
    push,
    update,
    remove,
    set
} from 'firebase/database';

// add function example
function addNewChallenge(challengeId, name, type, description) {
    const reference = ref(db, 'challenge/' + challengeId);

    set(reference, {
        challengeName: name,
        challengeType: type,
        description: description
    });
}

// helpful articles

https://blog.logrocket.com/storing-retrieving-data-react-native-apps-firebase/


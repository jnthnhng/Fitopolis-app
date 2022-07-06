## database imports for each screen needing database
ref is used for both storage and database, so I am differentiating the storage one as sRef
```
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";
import { db } from '../database/firebase.js';
import {
    ref,
    onValue,
    push,
    update,
    remove,
    get,
    set
} from 'firebase/database';
```

### add function example
```
function addNewChallenge(challengeId, name, type, description) {
    const reference = ref(db, 'challenge/' + challengeId);

    set(reference, {
        challengeName: name,
        challengeType: type,
        description: description
    });
}
```

### display example
found in Screens/ChallengeScreen.js

## helpful articles

https://blog.logrocket.com/storing-retrieving-data-react-native-apps-firebase/


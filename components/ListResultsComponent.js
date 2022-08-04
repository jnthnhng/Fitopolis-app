import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { db } from '../database/firebase.js';
import { ref, get, child } from 'firebase/database';

/**
 * A component that takes in an array of objects, map through them and display them as List items.
 * @param {Object} navigation     Navigation object from the parent
 * @param {results} challenges    Firebase challenge data objects from GetChallenges component
 * @returns
 */
const ListResults = ({ ...props }) => {
  // Initialize state
  const [badgeView, setBadgeView] = useState([]);

  // A function to navigate to the Challenge Participation Screen
  function navigationToParticipate(params) {
    return props.navigation.navigate('Participate', { challenges: params });
  }

  // A hook that query the database with an async function for the badge image and add it to the badgeView state
  useEffect(() => {
    /**
     * An async function that retrieve the challenge's badge image.
     * @param {int} badgeNumber badge ID in the RTDB under badges
     * @returns A download URL for the badge
     */
    async function getBadge(badgeNumber) {
      // Firebase reference for the app's storage
      const storage = getStorage();

      // Firebase RTDB reference
      const dbRef = ref(db);

      // Query the challenge's badge number and get the storage reference path.
      const badgeURL = await get(child(dbRef, 'badges/' + badgeNumber)).then(
        (badges) => badges.val().image
      );

      // Get the download URL for the badge image from the storage reference
      try {
        const badgeDownloadURL = await getDownloadURL(sRef(storage, badgeURL));
        return badgeDownloadURL;
      } catch (error) {
        console.log('No Photo Found');
      }
    }

    /**
     * A map method ran on the results array. The map will will get the challenge's badge image URI,
     * and then set the our badgeView state with the List.Item that includes the challenge information and badge URI.
     * */
    if (props.results != null) {
      // Map through each of the challenge in the array of objects
      props.results.map((challengeObject) => {
        // Check to see if the array contains a challenge object
        if (challengeObject != null) {
          // Call the async function to get the badge URI
          getBadge(challengeObject.val().badge[0].value).then(
            (badgeUri) => (
              // Add a 'badgeURI' property to the challenge object and assign the URL value
              (challengeObject['badgeURI'] = badgeUri),
              // set state by adding to it the array of challenges from the map
              setBadgeView((badgeView) => [
                badgeView,
                <>
                  <List.Item
                    key={challengeObject.key}
                    title={challengeObject.val().challengeName}
                    description={challengeObject.val().description}
                    left={(props) => <List.Icon {...props} icon="run" />}
                    right={(props) => <List.Icon icon={{ uri: badgeUri }} />}
                    onPress={() => navigationToParticipate(challengeObject)}
                  />
                </>,
              ])
            )
          );
        }
      });
    }
  }, []);

  // Returns the state which includes all the challenges as an array of List.Item components.
  return badgeView;
};

export default ListResults;

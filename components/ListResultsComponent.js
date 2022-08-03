import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';

/**
 * A component that takes in an array of objects, map through them and display them as List items.
 * @param {Object} navigation     Navigation object from the parent
 * @param {results} challenges    Challenge data object from GetChallenges component
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
    // An async function that retrieve the challenge's badge image.
    async function getBadge(badgePath) {
      // Get the firebase reference for the app's storage
      const storage = getStorage();

      // Try to get the badge image URI from the Storage db
      try {
        const badgeLocation = await getDownloadURL(sRef(storage, badgePath));
        return badgeLocation;
      } catch (error) {
        console.log('No Photo Found');
      }
    }

    /**
     * A map method ran on the results array. The map will will get the challenge's badge image URI,
     * and then set the our badgeView state with the List.Item that includes the challenge information and badge URI.
     * */
    if (props.results != null) {
      props.results.map((challengeObject) => {
        if (challengeObject != null) {
          // async function to get the badge URI
          getBadge(challengeObject.val().badge).then(
            (badgeUri) => (
              (challengeObject['badgeURI'] = badgeUri),
              // set state by adding to it all the challenges from the map
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

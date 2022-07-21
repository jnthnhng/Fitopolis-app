import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';

const ListResults = ({ ...props }) => {
  const [badgeView, setBadgeView] = useState([]);

  useEffect(() => {
    async function getBadge(badgePath) {
      const storage = getStorage();

      try {
        const badgeLocation = await getDownloadURL(sRef(storage, badgePath));
        console.log(badgeLocation);
        return badgeLocation;
      } catch (error) {
        console.log('No Photo Found');
      }
    }
    props.results.map((item) => {
      getBadge(item.badge).then((badgeUri) =>
        setBadgeView((badgeView) => [
          badgeView,
          <>
            <List.Item
              title={item.challengeName}
              description={item.description}
              left={(props) => <List.Icon {...props} icon="run" />}
              right={(props) => <List.Icon icon={{ uri: badgeUri }} />}
              onPress={props.navigation.navigate('Participate')}
            />
          </>,
        ])
      );
    });
  }, []);

  return badgeView;
};

export default ListResults;

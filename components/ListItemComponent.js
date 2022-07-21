import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { db } from '../database/firebase.js';
import {
  ref,
  onValue,
  push,
  update,
  remove,
  get,
  set,
  child,
} from 'firebase/database';

const ListResults = ({ results }) => {
  const [Uris, setUris] = useState([]);
  const [badgeView, setBadgeView] = useState([]);

  useEffect(() => {
    async function getBadge(badgePath) {
      // console.log(badgeLocation);

      const storage = getStorage();

      try {
        const badgeLocation = await getDownloadURL(sRef(storage, badgePath));
        console.log(badgeLocation);
        return badgeLocation;
      } catch (error) {
        console.log('No Photo Found');
      }
    }
    results.map((item) => {
      getBadge(item.badge).then((badgeUri) =>
        setBadgeView((badgeView) => [
          badgeView,
          <List.Item
            title={item.challengeName}
            description={item.description}
            left={(props) => <List.Icon {...props} icon="run" />}
            right={(props) => <List.Icon icon={{ uri: badgeUri }} />}
          />,
        ])
      );
    });
  }, []);

  //   console.log(badgeLocation);
  //   const display = (data) => {
  //     return;
  //   };
  //   console.log('uris' + Uris);
  //   console.log(badgeView)
  return badgeView;
};

export default ListResults;

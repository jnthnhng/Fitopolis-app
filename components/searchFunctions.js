import React, { useState, useEffect } from 'react';
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
  getDocs,
  once,
  on,
} from 'firebase/database';

import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemComponent from './ItemComponent.js';

const GetChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const challengesRef = ref(db, 'challenge/');
  const dbRef = ref(db);

  // //   console.log(challengesRef);
  // //   console.log(dbRef);
  //   const aChallenge = '-N6ekNHXF3nQg5z5annO';

  // let res_values;
  // let display;

  get(child(dbRef, `challenge/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let res = snapshot.val();
        const challenges = Object.values(res);
        setChallenges(challenges);
        //   res_values = Object.values(res)
        //   display = res_values[2].challengeType;
        //   console.log(Object.keys(res_values[0]));
        // console.log(res_values)
        // console.log(display);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  //   useEffect(() => {
  //     challengesRef.on('value', (snapshot) => {
  //       let data = snapshot.val();
  //       const challenges = Object.values(data);
  //       setChallenges(challenges);
  //     });
  //   }, []);

  return (
    <View>
      {challenges.length > 0 ? (
        <ItemComponent items={challenges} />
      ) : (
        <Text>No items</Text>
      )}
    </View>
  );

  //   return (
  //     <ScrollView>
  //       <View style={{ flex: 1, marginTop: 100 }}>
  //         <Text style={{ fontSize: 24 }}>{display} hi</Text>
  //       </View>
  //     </ScrollView>
  //   );
};

export default GetChallenges;

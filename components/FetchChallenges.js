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
} from 'firebase/database';

import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native-web';
import { FlatList } from 'react-native-gesture-handler';

const Fetch = () => {
  const [challenges, setChallenges] = useState([]);
  const challengesRef = ref(db, 'challenge/');
  const dbRef = ref(db);
  console.log(challengesRef);
  console.log(dbRef);
  const aChallenge = '-N6ekNHXF3nQg5z5annO';

  //   async function getChallenges(db) {
  //     const challengeCollection = collection(db, 'challenge');
  //     const challengeSnapshot = await getDocs(citiesCol);
  //     const challengeList = challengeSnapshot.docs.map((doc) => doc.data());
  //     return challengeList;
  //   }
  //   console.log(getChallenges);
  challengesRef.queryOrderedByChild("challengeType").queryEqualToValue(true);

  get(child(dbRef, `challenge/challengeType`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let res = snapshot.val();
        console.log(snapshot.val());
        // console.log("Keys -----")
        // console.log(Object.keys(res))
        // console.log("Entries -----")
        // console.log(Object.entries(res))
        // console.log("Values -----")
        // console.log(Object.values(res))
        // console.log("The Key -----")
        // console.log(Object.entries(res)[0][0]) 
        // console.log(Object.entries(res)[0][1].challengeType)
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });



  return (
    <View style={{ flex: 1, marginTop: 100 }}>
     
      <Text> Hi </Text>
    </View>
  );
};

export default Fetch;

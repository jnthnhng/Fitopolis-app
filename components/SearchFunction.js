import React, { useState, useEffect } from 'react';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { db } from '../database/firebase.js';
import { ref, get, child } from 'firebase/database';

import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ListResults from './ListItemComponent.js';

const GetChallenges = (props) => {
  const [challenges, setChallenges] = useState([]);
  const challengesRef = ref(db, 'challenge/');
  const dbRef = ref(db);
  console.log(props);

  // get(child(dbRef, `challenge/` + props.searchType))

  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       let res = snapshot.val();
  //       const challenges = Object.values(res);

  //       useEffect(() => {
  //         setChallenges(challenges);
  //       }, []);
  //     } else {
  //       console.log('No data available');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // useEffect(() => {
  //   challengesRef.on('value', (snapshot) => {
  //     let data = snapshot.val();
  //     const challenges = Object.values(data);
  //     setChallenges(challenges);
  //   });
  // }, []);
  useEffect(() => {
    get(child(dbRef, 'challenge/' + props.searchType)).then((snapshot) => {
      let data = [];
      snapshot.forEach((child) => {
        console.log("child.val().challengeType")
        console.log(child.val().challengeType)
        // console.log(typeof child.val().challengeType)
        console.log("props.searchType")
        console.log(props.searchType)
        console.log(typeof props.searchType)
        // console.log(child.val().challengeType == props.searchType)
        if (child.val().challengeType == props.searchType) {
        data.push(child.val());
        }
        
      });
      console.log("data")
      console.log(data)
      setChallenges(data);
    });
  }, [props.searchType]);
  console.log("challenges")
  console.log(challenges)
  if (props.searchType.length == 0) {
    return (
      <View>
        <Text> Search!</Text>
      </View>
    );
  } else {
    // console.log(challenges);

    return (
      <View>
        {challenges.length > 0 ? (
          <ListResults results={challenges} />
        ) : (
          <Text style={styles.text}>No Results</Text>
        )}
      </View>
    );
  }
};

export default GetChallenges;

const styles = StyleSheet.create({
  text: {
    margin: 20,
    padding: 20,
  },
});

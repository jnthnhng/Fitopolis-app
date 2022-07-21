import React, { useState, useEffect } from 'react';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { db } from '../database/firebase.js';
import { ref, get, child } from 'firebase/database';

import { StyleSheet, Text, ScrollView, View } from 'react-native';
import ListResults from './ListItemComponent.js';

const GetChallenges = (props) => {
  const [challenges, setChallenges] = useState([]);
  const challengesRef = ref(db, 'challenge/');
  const dbRef = ref(db);

  useEffect(() => {
    console.log(props.searchType.length);

    get(child(dbRef, 'challenge/' + props.searchType)).then((snapshot) => {
      let data = [];
      snapshot.forEach((child) => {
        if (child.val().challengeType == props.searchType) {
          data.push(child.val());
        }
      });
      setChallenges(data);
    });
  }, [props.searchType]);

  if (props.searchType.length == 0 && challenges.length == 0) {
    return (
      <View>
        <Text> Search!</Text>
      </View>
    );
  } else {
    return (
      <View>
        {challenges.length > 0 ? (
          <ListResults results={challenges} />
        ) : (
          <Text style={styles.text}> No results </Text>
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
    alignContent: 'center',
  },
});

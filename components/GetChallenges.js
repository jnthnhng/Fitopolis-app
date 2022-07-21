import React, { useState, useEffect } from 'react';
import { db } from '../database/firebase.js';
import { ref, get, child } from 'firebase/database';

import { StyleSheet, Text, View } from 'react-native';
import ListResults from './ListResultsComponent.js';

const GetChallenges = ({ ...props }) => {
  const [challenges, setChallenges] = useState([]);
  // const challengesRef = ref(db, 'challenge/');
  const dbRef = ref(db);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    setNavigation(props.navigation);
  }, []);

  useEffect(() => {
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
      <View style={styles.resultsContainer}>
        {challenges.length > 0 ? (
          <ListResults results={challenges} navigation={navigation} />
        ) : (
          <Text style={styles.text}> No results</Text>
        )}
      </View>
    );
  }
};

export default GetChallenges;

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    width: '95%',
    height: '100%',
    backgroundColor: '#e6e4df',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    margin: 20,
    padding: 20,
    alignContent: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { db } from '../database/firebase.js';
import { ref, get, child } from 'firebase/database';

import { StyleSheet, Text, View } from 'react-native';
import ListResults from './ListResultsComponent.js';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * A component that takes in a search word and retrieves the data.
 * The navigation object is from the parent, and used to pass to children
 * for onPress functionality.
 * @param {String} searchType     Search word used to query
 * @param {Object} navigation     Navigation Object from the parent
 * @returns A {View} of the results or "No Results" if no challenges are found.
 *          On the initial render, the component will render a welcome message.
 */
const GetChallenges = ({ ...props }) => {
  // Initialize state
  const [navigation, setNavigation] = useState([]);
  const [challenges, setChallenges] = useState([]);

  // Get reference to the database
  const dbRef = ref(db);
  // const challengesRef = ref(db, 'challenge/');

  // A hook to save the navigation object from "props" to "navigation"
  useEffect(() => {
    setNavigation(props.navigation);
  }, []);

  /**
   * A hook that does an async call to the database to retrieve the challenge data
   * And deps is set to [props.searchType] so that if the searchType changes, the useEffect will run again
   * Obtaining new data
   */
  useEffect(() => {
    // An async called to the database with the path to the search word.
    // In this case, it's a challenge type
    get(child(dbRef, 'challenge/' + props.searchType)).then((snapshot) => {
      let data = [];

      // Loop through each object and push the challenge that matches the search type
      // to the data array
      snapshot.forEach((child) => {
        if (child.val().challengeType == props.searchType) {
          data.push(child.val());
        }
      });

      // Set data array to the challenges state
      setChallenges(data);
    });
  }, [props.searchType]);
  
  return (
    <>
      <ScrollView>
        {challenges.length > 0 && props.searchType.length != 0 ? (
          <View style={styles.resultsContainer}>
            <ListResults results={challenges} navigation={navigation} />
          </View>
        ) : null}
        {challenges.length == 0 && props.searchType.length != 0 ? (
          <View style={styles.resultsContainer}>
            <Text style={styles.text}> No results</Text>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
  // }
};

export default GetChallenges;

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    // width: '95%',
    // height: '95%',
    backgroundColor: 'white',
    // padding: 100,
    margin: 10,
    borderRadius: 15,
    marginBottom: '15%',
  },
  text: {
    margin: 20,
    padding: 20,
    alignContent: 'center',
  },
});

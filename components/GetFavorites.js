import React, { useState, useEffect } from "react";
import { db } from "../database/firebase.js";
import { ref, get, child } from "firebase/database";

import { StyleSheet, Text, View } from "react-native";
import ListResults from "./ListResultsComponent.js";

/**
 * A component that takes in a search word and retrieves the data.
 * The navigation object is from the parent, and used to pass to children
 * for onPress functionality.
 * @param {String} searchType     Search word used to query
 * @param {Object} navigation     Navigation Object from the parent
 * @returns A {View} of the results or "No Results" if no challenges are found.
 *          On the initial render, the component will render a welcome message.
 */
const GetFavorites = ({ ...props }) => {
  // Initialize state
  const [navigation, setNavigation] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
    get(child(dbRef, "users/" + props.searchType + "/favorites/")).then(
      (snapshot) => {
        let data = [];
        // Loop through each object and push the challenge that matches the search type
        // to the data array
        snapshot.forEach((child) => {
          // data.push(child.val());
        });

        // Set data array to the challenges state
        console.log("HERE DATA", data);
        setFavorites(data);
      }
    );
  }, []);

  // Otherwise, return the results or display "No Results"
  return (
    <View style={styles.resultsContainer}>
      <ListResults results={favorites} navigation={navigation} />
    </View>
  );
};

export default GetFavorites;

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    width: "95%",
    height: "100%",
    backgroundColor: "#e6e4df",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    margin: 20,
    padding: 20,
    alignContent: "center",
  },
});

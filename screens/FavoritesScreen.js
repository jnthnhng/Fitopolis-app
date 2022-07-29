import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";

// Database imports
import { getAuth } from "firebase/auth";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../database/firebase.js";
import {
  ref,
  getDatabase,
  get,
} from "firebase/database";

// Other imports
import Ionicons from "react-native-vector-icons/Ionicons";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FavoritesScreen = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const db = getDatabase();

  // This adds the favorite to the end of the challenges array
  const addChallengeToEnd = (newChallenge) => {
    setChallenges((state) => [...state, newChallenge]);
  };


  const getFavorites = () => {
    // Get favorites from user ID on realtime database
    get(ref(db, "users/" + userID + "/favorites/")).then((snapshot) => {
      // Loop through them and get the challenge information from each favorited item
      // These are stored in the challenges array
      if (snapshot.exists()) {
        snapshot.forEach((element) => {
          console.log("fave element: ", element.val().challenge);
          getChallengeInfo(element.val().challenge);
        });
      }
    });
  };

  // Retrieves challenge object from the path saved in user favorites
  const getChallengeInfo = (challengePath) => {
    get(ref(db, "challenge/" + challengePath)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("challenge snapshot: ", snapshot);
        addChallengeToEnd(snapshot);
      }
    });
  };

  useEffect(() => {
    console.log("NEW");
    getFavorites();
  }, []);

  // Renders flatlist item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.key}
      style={styles.item}
      onPress={() => navigation.navigate("Participate", { challenges: item })}
    >
      <Text style={styles.itemHeader}>{item.val().challengeName}</Text>
      <Text style={styles.itemDescription}>{item.val().description}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="star" size={50} color="#6200ee" />
          <Text style={styles.favorites}>FAVORITES</Text>
        </View>
        <SafeAreaView>
          <FlatList data={challenges} renderItem={renderItem} />
        </SafeAreaView>
      </View>
    </>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: "#e6e4df",
    alignItems: "center",
  },
  container: {
    flex: 4,
    paddingTop: 10,
    backgroundColor: "red",
    width: "95%",
  },
  item: {
    backgroundColor: "#f6ebfc",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  itemHeader: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 12,
    fontStyle: "italic",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  favorites: {
    color: "black",
    // fontFamily: 'Lato_700Bold',
    fontWeight: "200",
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3b3a39",
    width: "70%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});

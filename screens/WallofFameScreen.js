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
import { ref, getDatabase, get } from "firebase/database";

// Other imports
import Ionicons from "react-native-vector-icons/Ionicons";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// route.params.challengeID = challenge ID of wall of fame
// route.params.challengeType = challenge type for wall of fame

const WallofFameScreen = ({ route, navigation }) => {
  const [challenges, setChallenges] = useState([]);

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const db = getDatabase();

  // This adds the favorite to the end of the challenges array
  const addChallengeToEnd = (newChallenge) => {
    setChallenges((state) => [...state, newChallenge]);
  };

  const getCompleted = () => {
    // Get created from user ID on realtime database
    const challengeURL =
      "challenge/" +
      route.params.challengeType +
      "/" +
      route.params.challengeID +
      "/completedUsers/";
    console.log(challengeURL);

    // Call database to get completed users
    get(
      ref(
        db,
        challengeURL
      )
    ).then((snapshot) => {
      // Loop through them and get the challenge information from each favorited item
      // These are stored in the challenges array
      console.log("here", snapshot)
      if (snapshot.exists()) {
        snapshot.forEach((element) => { 
        console.log(element.val().user);
          getUserInfo(element.val().user);
        });
      }
    });
  };

  // Retrieves challenge object from the path saved in user favorites
  const getUserInfo = (userId) => {
    get(ref(db, "users/" + userID)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("challenge snapshot: ", snapshot);
        addChallengeToEnd(snapshot);
      }
    });
  };

  useEffect(() => {
    const refreshData = navigation.addListener('focus', () => {
      getCompleted();
    })
    return refreshData;
    // getData();
  }, [navigation]);


  // Renders flatlist item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.key}
      style={styles.item}
    >
      <Text style={styles.itemHeader}>{item.val().name}</Text>
      <Text style={styles.itemDescription}>{item.val().username}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="trophy" size={50} color="#C2778B" />
          <Text style={styles.favorites}>WALL OF FAME</Text>
        </View>
        <SafeAreaView>
          <FlatList data={challenges} renderItem={renderItem} numColumns={2}/>
        </SafeAreaView>
      </View>
    </>
  );
};

export default WallofFameScreen;

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
    backgroundColor: "#C2778B",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
    justifyContent: "center",
    alignContent: "center",
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
    textAlign: "center",
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

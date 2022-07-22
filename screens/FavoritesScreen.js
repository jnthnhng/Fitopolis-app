import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
  Button,
} from "react-native";

// Database imports
import { getAuth } from "firebase/auth";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { db, storage, firebaseConfig } from "../database/firebase.js";
import {
  set,
  update,
  ref,
  getDatabase,
  onValue,
  get,
  child,
  push,
} from "firebase/database";
import GetFavorites from "../components/GetFavorites";

// Other imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState("");
  const [user, setUser] = useState("");

  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser.uid);
  });

  // MOCK to add favorites to user accounts - will need to remove
  const addFavorite = () => {
    // Mock creating a challenge, need to hook this up to the Challenge screen
    const challengeId = "Aerobics/" + "-N7Vaz_2b6FDT2pcsFfp";
    const db = getDatabase();
    // Create database reference
    const postListRef = ref(
      db,
      "users/" + auth.currentUser.uid + "/favorites/"
    );
    const newPostRef = push(postListRef);
    // Set child as challenge ID
    set(newPostRef, {
      challenge: challengeId,
    });
  };

  // useEffect(() => {
  //   // An async called to the database with the path to the search word.
  //   // In this case, it's a challenge type
  //   // Adapted from code in GetChallenges.js from Jonathan Hang
  //   get(ref(db, "users/" + auth.currentUser.uid + "/favorites/")).then(
  //     (snapshot) => {
  //       let data = [];
  //       // Loop through each object and push the favorites to the data array
  //       snapshot.forEach((child) => {
  //         data.push(child.val());
  //       });
  //       console.log("DATA: ", data);
  //       // Set data array to the favorites state
  //       setFavorites(data);
  //     }
  //   );
  // }, []);

  return (
    <>
      {auth.currentUser == null ? (
        <View style={styles.container1}>
          <Text>Please login to access data</Text>
          <View style={styles.buttonSOContainer}>
            <TouchableOpacity onPress={handleSignOut} style={styles.buttonSO}>
              <Text style={styles.buttonSOText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Ionicons name="star" size={50} color="gold" />
              <Text style={styles.favorites}>Favorites</Text>
            </View>
            <View>
              <Button title="Add Favorite" onPress={addFavorite} />
            </View>
            <ScrollView>
              <GetFavorites navigation={navigation} searchType={user} />
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e4df",
    alignItems: "center",
  },
  container1: {
    flex: 1,
    backgroundColor: "#e6e4df",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  favorites: {
    color: "black",
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 20,
  },
  challengeInfo: {
    flexDirection: "row",
    flexShrink: 1,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  challengeContainer: {
    padding: 5,
    elevation: 4,
    backgroundColor: "#c7c7c3",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    textAlign: "center",
    flexShrink: 1,
  },
  stat: {
    flexShrink: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
  buttonContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#3b3a39",
    width: "70%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  manageText: {
    fontWeight: "600",
    fontSize: 25,
    paddingBottom: 15,
  },
  buttonSOContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonSO: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSOText: {
    color: "black",
    fontWeight: "600",
    fontSize: 18,
  },
});

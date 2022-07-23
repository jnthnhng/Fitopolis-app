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
import ListResults from "../components/ListResultsComponent.js";

// Other imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState(null);
  const [user, setUser] = useState("");
  const [challenges, setChallenges] = useState([]);

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const db = getDatabase();

  const addChallengeToEnd = (newChallenge) => {
    setChallenges(state => [...state, newChallenge]);
  }

  const getFavorites = () => {
    get(ref(db, "users/" + userID + "/favorites/")).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((element) => {
          console.log("fave element: ", element.val().challenge);
          getChallengeInfo(element.val().challenge);
        });
      }
    });
  };

  const getChallengeInfo = (challengePath) => {
    get(ref(db, "challenge/" + challengePath)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("challenge snapshot: ", snapshot.val());
        addChallengeToEnd(snapshot.val());
      }
    });
  };

  useEffect(() => {
    console.log("NEW");
    getFavorites();
  }, []);

    // Navigate to Participate screen

    function goToParticipate() {
      navigation.navigate("Participate", {id: false});
    }

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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={goToParticipate}>
      <Text style={styles.itemHeader}>{item.challengeName}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="star" size={50} color="#ebcafc" />
          <Text style={styles.favorites}>Favorites</Text>
        </View>
        <View>
          <Button title="Add Favorite" onPress={addFavorite} />
        </View>
        <View>
          <FlatList data={challenges} renderItem={renderItem} />
        </View>
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
    backgroundColor: '#f6ebfc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.25
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
    fontWeight: "bold",
    fontSize: 50,
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

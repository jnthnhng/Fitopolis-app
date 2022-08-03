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
import { ref, getDatabase, get } from "firebase/database";
import { db, storage, firebaseConfig } from "../database/firebase.js";
// storage imports for images
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";

// Other imports
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FavoritesScreen = ({ navigation }) => {
  const [urls, setURLs] = useState([]);

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const db = getDatabase();

  // This adds the favorite to the end of the challenges array
  const addURLToEnd = (newURL) => {
    setURLs((state) => [...state, newURL]);
  };

  const getUserBadges = () => {
    // Get favorites from user ID on realtime database
    get(ref(db, "users/" + userID + "/badges/")).then((snapshot) => {
      // Loop through them and get the challenge information from each favorited item
      // These are stored in the challenges array
      if (snapshot.exists()) {
        snapshot.forEach((element) => {
          console.log("badge ", element.val().badge);
          getDownload(element.val().badge);
        });
      }
    });
  };

  // Retrieve badge image url
  const getDownload = async (image) => {
    // Retrieves image from storage and stores in list
    const imageURL = "badgeImages/badge" + image + ".jpg";
    const storage = getStorage();
    const reference = sRef(storage, imageURL);
    await getDownloadURL(reference).then((x) => {
      addURLToEnd(x);
    });
  };

  // Gets fresh data upon going to the screen
  useEffect(() => {
    const refreshData = navigation.addListener("focus", () => {
      getUserBadges();
    });
    return refreshData;
  }, [navigation]);

  // Renders flatlist item
  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.key} style={styles.item}>
      <Avatar.Image source={{ uri: item }} size={55} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="trophy" size={50} color="#ffffb5" />
          <Text style={styles.favorites}>BADGES</Text>
        </View>
        <SafeAreaView>
          <FlatList data={urls} renderItem={renderItem} numColumns={3} />
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
    backgroundColor: "#ffffb5",
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

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { Avatar } from "react-native-paper";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Database imports
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, storage, firebaseConfig } from "../database/firebase.js";
import {
  set,
  update,
  ref,
  getDatabase,
  onValue,
  get,
  child,
} from "firebase/database";
// storage imports for images
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";

// Screen Imports
import ProfileScreen from "./ProfileScreen";
import BadgesScreen from "./BadgesScreen";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FitopolisHomeScreen = ({ navigation }) => {
  const [imageName, setImageName] = useState(null);
  const [url, setUrl] = useState(null);

  // Get image from firebase storage
  // Get user ID and file name from realtime database

  const auth = getAuth();
  const userID = auth.currentUser.uid;

  const db = getDatabase();
  // const imageSnapshot =  get(ref(db, "users/" + userID));
  // console.log("image snap: ", imageSnapshot);
  const getData = () => {
    get(ref(db, "users/" + userID))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setImageName(snapshot.val().profilePhoto);
          getImage(snapshot.val().profilePhoto);
          console.log("user image: ", snapshot.val().profilePhoto);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Image from storage
  const getImage = async (profilePhoto) => {
    console.log("image name: ", profilePhoto);
    const storage = getStorage();
    const reference = sRef(storage, profilePhoto);
    await getDownloadURL(reference).then((x) => {
      setUrl(x);
      console.log("download url: ", x);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   getImage();
  // }, []);

  // Navigate to Create screen
  function goToCreate() {
    navigation.navigate("Create");
  }

  // Navigate to Search screen
  function goToSearch() {
    navigation.navigate("Search");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          {/* {url == null ? (
            <Ionicons name="person-circle" size={110} />
          ) : (
            <Avatar.Image source={{ uri: url }} size={110} />
          )} */}
          <Avatar.Image source={{ uri: url }} size={110} />
          <Text style={styles.number}>4</Text>
          <Ionicons name="trophy-outline" size={60} />
        </View>
        <View style={styles.challengeInfo}>
          <View style={styles.challengeContainer}>
            <Text style={styles.stat}>
              Challenges Created {"\n"}
              {"\n"} 4
            </Text>
          </View>
          <View style={styles.challengeContainer}>
            <Text style={styles.stat}>
              Challenges Completed {"\n"}
              {"\n"} 6
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.manageText}>Manage Challenges</Text>
          <TouchableOpacity style={styles.button} onPress={goToCreate}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FitopolisHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e4df",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  userPhoto: {
    width: 100,
    height: 100,
  },
  number: {
    width: "20%",
    fontSize: 40,
    textAlign: "right",
    textAlignVertical: "center",
    color: "black",
  },
  itemPhoto: {
    width: 50,
    height: 47,
  },
  challengeInfo: {
    flex: 1,
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
});

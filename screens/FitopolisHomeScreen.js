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
import { Avatar, ActivityIndicator } from "react-native-paper";

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
  push,
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
  const [numCreated, setNumCreated] = useState(null);
  const [numCompleted, setNumCompleted] = useState(null);
  const [numInProgress, setNumInProgress] = useState(null);
  const [name, setName] = useState(null);

  // Get image from firebase storage
  // Get user ID and file name from realtime database

  const auth = getAuth();
  const userID = auth.currentUser.uid;

  const db = getDatabase();

  // MOCK to add favorites to user accounts - will need to remove
  const addCompleted = () => {
    // Mock creating a challenge, need to hook this up to the Challenge screen
    const challengeId = "Running/" + "-N74GoijcLLEhSYqwYPf";
    const db = getDatabase();
    // Create database reference
    const postListRef = ref(db, "users/" + auth.currentUser.uid + "/progress/");
    const newPostRef = push(postListRef);
    // Set child as challenge ID
    set(newPostRef, {
      challenge: challengeId,
    });
  };

  const getData = () => {
    get(ref(db, "users/" + userID))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setImageName(snapshot.val().profilePhoto);
          getImage(snapshot.val().profilePhoto);
          setNumCreated(Object.keys(snapshot.val().created).length);
          setNumCompleted(Object.keys(snapshot.val().completed).length);
          setNumInProgress(Object.keys(snapshot.val().progress).length);
          setName(snapshot.val().name);
          console.log("created", Object.keys(snapshot.val().favorites).length);
          console.log("USER", userID);
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
    const storage = getStorage();
    const reference = sRef(storage, profilePhoto);
    await getDownloadURL(reference).then((x) => {
      setUrl(x);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // Navigate to Create screen

  function goToCreate() {
    navigation.navigate("Create", { id: false });
  }

  // Navigate to Search screen
  function goToSearch() {
    navigation.navigate("Search");
  }

  // Navigate to Created screen
  function goToCreated() {
    console.log("Here");
    navigation.navigate("Created");
  }

  // Navigate to Completed screen
  function goToCompleted() {
    console.log("Here");
    navigation.navigate("Completed");
  }

  // Navigate to In Progress screen
  function goToInProgress() {
    console.log("Here");
    navigation.navigate("In Progress");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          {url == null ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Avatar.Image source={{ uri: url }} size={150} />
          )}
          {/* <Avatar.Image source={{ uri: url }} size={110} /> */}
          {/* <Text style={styles.number}>4</Text>
          <Ionicons name="trophy-outline" size={60} /> */}
        </View>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.challengeInfo}>
          <TouchableOpacity style={styles.created} onPress={goToCreated}>
            <Text style={styles.stat}>
              CREATED {"\n"}
              {"\n"} {numCreated}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completed} onPress={goToCompleted}>
            <Text style={styles.stat}>
              COMPLETED {"\n"}
              {"\n"} {numCompleted}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.challengeInfo2}>
          <TouchableOpacity style={styles.progress} onPress={goToInProgress}>
            <Text style={styles.stat}>
              IN PROGRESS {"\n"}
              {"\n"} {numInProgress}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {/* <Text style={styles.manageText}>MANAGE</Text> */}
          <TouchableOpacity style={styles.button} onPress={goToCreate}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={addCompleted}>
            <Text style={styles.buttonText}>Add In Progress</Text>
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
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderBottomColor: "black",
    // borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
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
    justifyContent: "space-between",
    width: "80%",
  },
  challengeInfo2: {
    flex: 1,
    flexDirection: "row",
    flexShrink: 1,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "38%",
  },
  created: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: "#FA8072",
    opacity: "20%",
  },
  progress: {
    flex: 1,
    backgroundColor: "#97C1a9",
    borderRadius: 50,
    width: "40%",
  },
  completed: {
    flex: 1,
    backgroundColor: "#ABDEE6",
    borderRadius: 50,
    marginLeft: 10,
  },
  stat: {
    // flexShrink: 1,
    textAlign: "center",
    fontWeight: "300",
    fontSize: 20,
    padding: 12,
  },
  buttonContainer: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3b3a39",
    opacity: "20%",
    width: "60%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "300",
    fontSize: 20,
  },
  manageText: {
    fontWeight: "200",
    fontSize: 25,
    paddingBottom: 15,
  },
  nameText: {
    fontWeight: "300",
    fontSize: 30,
    paddingBottom: 15,
    textTransform: "uppercase",
  },
});

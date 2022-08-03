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
  const [numCompleted, setNumCompleted] = useState(null);
  const [badge1, setBadge1] = useState(null);
  const [badge2, setBadge2] = useState(null);
  const [badge3, setBadge3] = useState(null);
  const [badge4, setBadge4] = useState(null);
  const [badge5, setBadge5] = useState(null);

  const imageNames = [
    "first_challenge_completed.jpg",
    "fifth_challenge_badge.jpg",
    "tenth_challenge_badge.jpg",
    "fiftieth_challenge_badge.jpg",
    "hundredth_challenge_completed.jpg",
  ];

  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const db = getDatabase();

  // This adds the badge to the end of the badge array
  const addURLToEnd = (newURL) => {
    setURLs((state) => [...state, newURL]);
  };

  const getMilestoneBadges = () => {
    getBadge1();
    getBadge2();
    getBadge3();
    getBadge4();
    getBadge5();
    getChallengesCompleted();
  };

  // Get number of challenges completed
  const getChallengesCompleted = () => {
    get(ref(db, "users/" + userID))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNumCompleted(Object.keys(snapshot.val().completed).length);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Retrieve badge image url
  // Must call each one separately because async call for them all
  // stored them in different orders in the list
  const getBadge1 = async (image) => {
    const imageURL = "badgeImages/fitopolis-badges/first_challenge_completed.jpg";
    const storage = getStorage();
    const reference = sRef(storage, imageURL);
    await getDownloadURL(reference).then((x) => {
      setBadge1(x);
    });
  };

  const getBadge2 = async (image) => {
    const imageURL = "badgeImages/fitopolis-badges/fifth_challenge_badge.jpg";
    const storage = getStorage();
    const reference = sRef(storage, imageURL);
    await getDownloadURL(reference).then((x) => {
      setBadge2(x);
    });
  };

  const getBadge3 = async (image) => {
    const imageURL = "badgeImages/fitopolis-badges/tenth_challenge_badge.jpg";
    const storage = getStorage();
    const reference = sRef(storage, imageURL);
    await getDownloadURL(reference).then((x) => {
      setBadge3(x);
    });
  };

  const getBadge4 = async (image) => {
    const imageURL = "badgeImages/fitopolis-badges/fiftieth_challenge_badge.jpg";
    const storage = getStorage();
    const reference = sRef(storage, imageURL);
    await getDownloadURL(reference).then((x) => {
      setBadge4(x);
    });
  };

  const getBadge5 = async (image) => {
    // Gets milestone badge images from database
    const imageURL = "badgeImages/fitopolis-badges/hundredth_challenge_completed.jpg";
    const storage = getStorage();
    const reference = sRef(storage, imageURL);
    await getDownloadURL(reference).then((x) => {
      setBadge5(x);
    });
  };

  useEffect(() => {
    const refreshData = navigation.addListener("focus", () => {
      getMilestoneBadges();
    });
    return refreshData;
  }, [navigation]);

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="ribbon" size={50} color="#6891C3" />
          <Text style={styles.favorites}>MILESTONES</Text>
        </View>
        <View style={styles.challengeInfo}>
          <TouchableOpacity style={styles.badge}>
            {numCompleted >= 1 && (
              <Avatar.Image source={{ uri: badge1 }} size={80} />

            )}
            <Text style={styles.stat}>1st Challenge Badge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badge}>
          {numCompleted >= 5 && (
              <Avatar.Image source={{ uri: badge2 }} size={80} />

            )}
            <Text style={styles.stat}>5th Challenge Badge</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.challengeInfo}>
          <TouchableOpacity style={styles.badge}>
          {numCompleted >= 10 && (
              <Avatar.Image source={{ uri: badge3 }} size={80} />

            )}
            <Text style={styles.stat}>10th Challenge Badge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badge}>
          {numCompleted >= 50 && (
              <Avatar.Image source={{ uri: badge4 }} size={80} />

            )}
            <Text style={styles.stat}>50th Challenge Badge</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.challengeInfo2}>
          <TouchableOpacity style={styles.progress}>
          {numCompleted >= 100 && (
              <Avatar.Image source={{ uri: badge5 }} size={80} />

            )}
            <Text style={styles.stat}>100th Challenge Badge</Text>
          </TouchableOpacity>
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
  progress: {
    flex: 1,
    backgroundColor: "#6891C3",
    borderRadius: 50,
    width: "40%",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  badge: {
    flex: 1,
    backgroundColor: "#6891C3",
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  stat: {
    // flexShrink: 1,
    textAlign: "center",
    fontWeight: "300",
    color: "white",
    fontSize: 15,
    padding: 12,
  },
});

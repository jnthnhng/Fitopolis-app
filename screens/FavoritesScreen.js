import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoritesScreen = ({ navigation }) => {
  const auth = getAuth();
  function goToCreate() {
    navigation.navigate("Create");
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => alert(error.message));
  };

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
            <View style={styles.challengeInfo}>
              <View style={styles.challengeContainer}>
                <Text style={styles.stat}>Challenge 1</Text>
              </View>
              <View style={styles.challengeContainer}>
                <Text style={styles.stat}>Challenge 2</Text>
              </View>
            </View>
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

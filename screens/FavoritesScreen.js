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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoritesScreen = ({ navigation }) => {
  function goToCreate() {
    navigation.navigate("Create");
  }
  return (
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
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e4df",
    alignItems: "center",
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
});

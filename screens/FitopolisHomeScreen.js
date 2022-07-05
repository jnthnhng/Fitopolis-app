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

import ProfileScreen from "./ProfileScreen";
import BadgesScreen from "./BadgesScreen";

const FitopolisHomeScreen = ({ navigation }) => {
  function goToCreate() {
    navigation.navigate("Create");
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            source={require("../assets/images/default-user.png")}
            style={styles.userPhoto}
          />
          <Text style={styles.number}>4</Text>
          <Image
            source={require("../assets/images/trophie2.png")}
            style={styles.itemPhoto}
          />
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
          <TouchableOpacity style={styles.button}>
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
    color: "#636361",
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

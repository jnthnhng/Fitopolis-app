import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FitopolisHomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.outputTextContainer}>
        <Text style={styles.box}>username</Text>
        <Text style={styles.box}>Challenges Completed</Text>
        {/* <Text style={styles.box}>Badges Earned</Text> */}
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.challengeNum}>20</Text>
        <Text style={styles.badgeNum}>24</Text>
        <Image source={require("./assets/images/trophie.png")} />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.manageText}>Manage Challenges</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FitopolisHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e4df",
    alignItems: "center",
  },
  outputTextContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "gray",
    textAlign: "center",
  },
  numberContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    flex: 3,
  },
  button: {
    backgroundColor: "#3b3a39",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  manageText: {
    fontWeight: "600",
    fontSize: 20,
  },
});

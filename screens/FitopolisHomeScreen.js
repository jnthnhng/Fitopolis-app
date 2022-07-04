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

const FitopolisHomeScreen = () => {
  return (
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
        {/* <Text style={styles.item}>Badge Photo</Text> */}
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
  userInfo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  // item: {
  //   flex: 1,
  //   margin: 16,
  //   height: 150,
  //   borderRadius: "8px",
  //   elevation: 4,
  //   backgroundColor: "gray",
  //   shadowColor: "black",
  //   shadowOpacity: 0.25,
  //   shadowOffset: { width: 0, height: 2 },
  // },
  // innerContainer: {
  //   flex: 1,
  //   padding: 16,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // title: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    backgroundColor: "#e6e4df",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "gray",
    textAlign: "center",
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
    paddingBottom: 15,
  },
});

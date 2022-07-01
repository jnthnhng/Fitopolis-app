import React from "react";
import { StyleSheet, Text, View} from "react-native";

// database imports
import { db } from '../database/firebase.js';
import {
    ref,
    onValue,
    push,
    update,
    remove,
    set
} from 'firebase/database';


const CreateChallengeScreen = () => {

    return (
        <View style={StyleSheet.container}>
            <Text style={styles.logo}>Create Challenge</Text>
        </View>
    );
}

export default CreateChallengeScreen;

const styles = StyleSheet.create({
    label: {
      marginBottom: 16,
      marginTop: 16,
    },
    container: {
      flex: 1,
      backgroundColor: "#e6e4df",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      color: "black",
      fontWeight: "bold",
      fontSize: 50,
      marginBottom: 30,
    },
    button: {
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10,
      backgroundColor: "#3b3a39",
      borderRadius: 10,
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 20,
    },
  });
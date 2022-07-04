import React, {Component, useEffect, useState} from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";

// database imports
import { db } from '../database/firebase.js';
import {
    getDatabase,
    ref,
    onValue,
    push,
    update,
    remove,
    get,
    set
} from 'firebase/database';
import { PROPERTY_TYPES } from "@babel/types";
import { async } from "@firebase/util";




const ChallengeScreen = () => {

  const challengeId = 1;
  var challenge = {};

  async function getChallenge() {
    const snapshot = await get(ref(db, '/challenge/1'));
    challenge.name = (snapshot.val().challengeName);
    challenge.description = (snapshot.val().description);
    console.log(challenge.name);
    return;
  }

  getChallenge();
  console.log(challenge);
  console.log(challenge.name);

  return (
    <View style={StyleSheet.container}>
    <View style={styles.inputContainer}>
      <Text 
        style={styles.input}
      >{challenge.name}</Text>
      <Text 
        style={styles.input}
      >Description</Text>
      <Text
        style={styles.input}
      >Image</Text>
      <Text
        style={styles.input}
      >Type</Text>
      <Text 
        style={styles.input}
      >Goal1</Text>
      <Text
        style={styles.input}
      >Goal2</Text>
      <Text
        style={styles.input}
      >Goal 3</Text>
      <Text 
        style={styles.input}
      >Tags</Text>
      <Text 
        style={styles.input}
      >Badges</Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Edit Challenge</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}


export default ChallengeScreen;



const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  instructions: {
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#3b3a39",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});

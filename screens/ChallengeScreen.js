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

class ChallengeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      image: "",
      type: "",
      goal1: "",
      goal2: "",
      goal3: "",
      tags: "",
      badgeFK: "",
      badgeName: "",
    }
  }

  componentDidMount() {
    this.getChallenge();
    //this.getBadge();
  }

  getChallenge = async () => {
    const snapshot = await get(ref(db, '/challenge/1'));
    this.setState({name : (snapshot.val().challengeName)});
    this.setState({description : (snapshot.val().description)});
    this.setState({image : (snapshot.val().challengeImage)});
    this.setState({type : (snapshot.val().challengeType)});
    this.setState({goal1 : (snapshot.val().goal1)});
    this.setState({goal2 : (snapshot.val().goal2)});
    this.setState({goal3 : (snapshot.val().goal3)});
    this.setState({tags : (snapshot.val().tags)});
    this.setState({badge : (snapshot.val().badge)});
    snapshot = await get(ref(db, '/badges/' + this.state.badgeFK));
    this.setState({badgeName : (snapshot.val().badgeName)});
  }

  getBadge = async() => {
    const snapshot = await get(ref(db, '/badges/' + this.state.badgeFK));
    await this.setState({badgeName : (snapshot.val().badgeName)});
  }


  challenge = () => {
    return this.state;
  }

  render() {
    return (
      <View style={StyleSheet.container}>
      <View style={styles.inputContainer}>
        <Text 
          style={styles.input}
        >{this.challenge().name}</Text>
        <Text 
          style={styles.input}
        >{this.challenge().description}</Text>
        <Text
          style={styles.input}
        >{this.challenge().image}</Text>
        <Text
          style={styles.input}
        >{this.challenge().type}</Text>
        <Text 
          style={styles.input}
        >{this.challenge().goal1}</Text>
        <Text
          style={styles.input}
        >{this.challenge().goal2}</Text>
        <Text
          style={styles.input}
        >{this.challenge().goal3}</Text>
        <Text 
          style={styles.input}
        >{this.challenge().tags}</Text>
        <Text 
          style={styles.input}
        >{this.challenge().badgeName}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Edit Challenge</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }

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

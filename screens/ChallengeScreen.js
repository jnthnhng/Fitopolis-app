import React, {Component, useEffect, useState} from "react";
import { 
  StyleSheet, 
  Text, 
  Image,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";

// database imports
// storage imports for images
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";
// db imports
import { db } from '../database/firebase.js';
import {
    ref,
    get,
    set
} from 'firebase/database';

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
  }

  getChallenge = async () => {
    
    // get challenge values from db
    const snapshot = await get(ref(db, '/challenge/1'));
    this.setState({name : (snapshot.val().challengeName)});
    this.setState({description : (snapshot.val().description)});
    this.setState({type : (snapshot.val().challengeType)});
    this.setState({goal1 : (snapshot.val().goal1)});
    this.setState({goal2 : (snapshot.val().goal2)});
    this.setState({goal3 : (snapshot.val().goal3)});
    this.setState({tags : (snapshot.val().tags)});
    this.setState({badgeFK : (snapshot.val().badge)});

    // get image from storage using image path
    var storage = getStorage();
    const reference = sRef(storage, snapshot.val().challengeImage);
    await getDownloadURL(reference).then((x) => {
      this.setState({image: x});
    })

    // get badge name using FK stored in challenge
    const badgeSnapshot = await get(ref(db, '/badges/' + snapshot.val().badge));
    this.setState({badgeName : (badgeSnapshot.val().badgeName)});
    console.log(this.badgeName);
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
        <Image style={{height: 200, width: 200}} source={{uri: this.challenge().image}} />
        <Text 
          style={styles.input}
        >{this.challenge().description}</Text>
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
        >Badge: {this.challenge().badgeName}</Text>
        <Text 
          style={styles.input}
        >{this.challenge().tags}</Text>
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

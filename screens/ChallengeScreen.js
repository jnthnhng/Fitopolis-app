import React, {Component, useEffect, useState} from "react";
import { 
  StyleSheet, 
  Text, 
  Image,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

// database imports
// storage imports for images
import { getAuth } from 'firebase/auth';
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";
// db imports
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { db, firebaseConfig } from '../database/firebase.js';
import {
    ref,
    get,
    push,
    set
} from 'firebase/database';
import UpdateChallengeScreen from "./UpdateChallengeScreen.js";


class ChallengeScreen extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    navigation = this.props.navigation;
    this.state = {
      id: props.route.params.challengeID,
      //id: "-N7wasM9-QkXhZTwG_1r",
      name: null,
      description: null,
      image: null,
      type: props.route.params.type,
      //type: "test",
      goal1: null,
      goal2: null,
      goal3: null,
      tags: null,
      badgeFK: null,
      badges: [],
      badgeImages: [],
      creator: null,
    }
  }
 
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getChallenge();
    });
  }


  getChallenge = async () => {
    
    // get challenge values from db
    const snapshot = await get(ref(db, '/challenge/' + this.state.type + '/' + this.state.id));
    this.setState({name : (snapshot.val().challengeName)});
    this.setState({description : (snapshot.val().description)});
    this.setState({type : (snapshot.val().challengeType)});
    this.setState({goal1 : (snapshot.val().goal1)});
    this.setState({goal2 : (snapshot.val().goal2)});
    this.setState({goal3 : (snapshot.val().goal3)});
    this.setState({tags : (snapshot.val().tags)});
    this.setState({badgeFK : (snapshot.val().badge)});
    this.setState({badges : ([])});

    // get image from storage using image path
    var storage = getStorage();
    const reference = sRef(storage, snapshot.val().image);
    await getDownloadURL(reference).then((x) => {
      this.setState({image: x});
    });

    console.log(this.state.badgeFK);
    for (const badge of this.state.badgeFK) {
      const badgeSnapshot = await get(ref(db, '/badges/' + badge.value))
      var image = badgeSnapshot.val().image;
      var name = badgeSnapshot.val().name;
      console.log(name);
      const reference = sRef(storage, image);
      await getDownloadURL(reference).then((x) => {
        this.setState(prevState => ({
          badges: [...prevState.badges, {name, image: x} ] 
        }));
      });
    }


    // get creator username using FK stored in challenge
    const userSnapshot = await get(ref(db, '/users/' + snapshot.val().creator));
    this.setState({creator : (userSnapshot.val().username)});

  }

  challenge = () => {
    return this.state;
  }

  render() {

    function goToEdit(id, type) {
      navigation.navigate("Update", {
        id: id,
        type: type,
      });
    }

    async function addFavorite(id, type) {

      const auth = getAuth();
      const userID = auth.currentUser.uid;
      const challengeId = type + '/' + id;
      let favorited = false;

      const snapshot = await get(ref(db, 'users/' + userID + '/favorites'))
      snapshot.forEach((child) => {
        if (child.val().challenge == challengeId) {
          favorited = true;
        }
      })
      
      if (!favorited){
        // Create database reference
        const postListRef = ref(db, 'users/' + userID + '/favorites/');
        const newPostRef = push(postListRef);
        // Set child as challenge ID
        set(newPostRef, {
          challenge: challengeId,
        });
        alert("challenge added to your favorites!");
      } else {
        alert("This challenge is already in your favorites!");
      }
      
    }

    return (
      <ScrollView>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <Text 
            style={styles.logo}
            >{this.challenge().name}
          </Text>
          <View style={styles.buttonContainer}>
        </View>
          <View style={styles.container}>
            <Image style={styles.image} source={{uri: this.challenge().image}} />
          </View>
          <View style={styles.displayContainer}>
            <Text 
              style={styles.text}
              >{this.challenge().description}
              </Text>
          </View>
          <View style={styles.displayContainer}>
            <Text 
              style={styles.text}
              >Created by: {this.challenge().creator}
              </Text>
          </View>
          <View style={styles.displayContainer}>
            <Text
              style={styles.text}
              >{this.challenge().type}
            </Text>
          </View>
          <View style={styles.displayContainer}>
            <Text style={styles.text}>
              Goals:
            </Text>
            <Text 
              style={styles.text}
              >{this.challenge().goal1}
            </Text>
            <Text
              style={styles.text}
              >{this.challenge().goal2}
              </Text>
            <Text
              style={styles.text}
              >{this.challenge().goal3}
              </Text>
          </View>
          <View style={styles.displayContainer}>
            <Text style={styles.text}>Badges:</Text>
            {this.state.badges.map(badge =>
                <Text style={styles.text}>
                  <Image style={styles.badge} source={{uri: badge.image}} />
                  {'    '}
                  {badge.name}
                </Text>
            )}
          </View>
          <View style={styles.displayContainer}>
            <Text 
              style={styles.text}
              >{this.challenge().tags}
              </Text>
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {goToEdit(this.challenge().id, this.challenge().type)}} style={styles.button}>
            <Text style={styles.buttonText}>Edit Challenge</Text>
          </TouchableOpacity>
          </View>
        </View>  
        </KeyboardAvoidingView>
      </ScrollView>
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
  image: {
    width: 300,
    height: undefined,
    aspectRatio: 1.5,
    justifyContent: "center",
  },
  badge: {
    width: 15,
    height: undefined,
    aspectRatio: .9,
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    justifyContent: "center",
    marginTop: 10,
    paddingBottom: 10,
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
  displayContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  buttonSOText: {
    color: "black",
    fontWeight: "600",
    fontSize: 18,
  },
});
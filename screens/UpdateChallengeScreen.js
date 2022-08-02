import React, {Component, useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import SelectMultiple from "react-native-select-multiple";


import {
  getAuth,
} from "firebase/auth";

// database imports
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { db, storage, firebaseConfig} from "../database/firebase.js";
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";
import { ref, onValue, push, update, remove, set, get } from "firebase/database";
import { ActivityIndicator } from "react-native-paper";


class UpdateChallengeScreen extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    navigation = this.props.navigation;
    this.state = {
      id: props.route.params.id,
      //id: "-N7wasM9-QkXhZTwG_1r",
      badges: [],
      image: null,
      name: null,
      type: props.route.params.type,
      //type: "test",
      badge: null,
      description: null,
      goal1: null,
      goal2: null,
      goal3: null,
      tags: null,
      uploading: null,
      imageFileName: null,
      creator: null,
      selectedBadges: [],
    }
  }

  onSelectionsChange = (selectedBadges) => {
    this.setState({ selectedBadges })
  }

  // get badge info for displaying
  componentDidMount() {
    this.getBadges();
    this.getChallenge();
  }

  getBadges = async () => {

    const snapshot = await get(ref(db, '/badges'))
    snapshot.forEach((child) => {
      var value = child.key;
      var data = child.val();
      var label = child.val().name;
      this.setState(prevState => ({
        badges: [...prevState.badges, {value, data, label} ] 
      }));
    })
    
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
    this.setState({badge : (snapshot.val().badge)});
    this.setState({imageFileName : (snapshot.val().image).slice(17)})

    // get image from storage using image path
    var storage = getStorage();
    const reference = sRef(storage, snapshot.val().image);
    await getDownloadURL(reference).then((x) => {
      this.setState({image: x});
    });

    // get creator username using FK stored in challenge
    const userSnapshot = await get(ref(db, '/users/' + snapshot.val().creator));
    this.setState({creator : (userSnapshot.val().username)});

  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri});
    }
  };

  uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', this.state.image, true);
      xhr.send(null);
    });

    this.setState({imageFileName: new Date().toISOString()})
    const ref = firebase.storage().ref().child("/challengeImages/" + this.state.imageFileName);
    const snapshot = ref.put(blob);

    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, ()=>{
      this.setState({ uploading: true});
    }, 
    (error) => {
      this.setState({ uploading: false})
      console.log(error);
      return
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        this.setState({ uploading: false});
        return url;
      })
    });
  }


  render() {


    function updateChallenge(id, badge, name, type, description, goal1, goal2, goal3, tags, imageFileName) {
      
      const reference = ref(db, 'challenge/' + type + "/" + id);
      const auth = getAuth();
      const currentU = auth.currentUser;
    
      const key = update(reference, {
          badge: badge,
          challengeName: name,
          challengeType: type,
          description: description,
          goal1: goal1,
          goal2: goal2,
          goal3: goal3,
          tags: tags,
          image: ("/challengeImages/" + imageFileName),
          creator: currentU.uid,
      }).key;
      
      alert("successfully updated challenge!");
      goToChallenge(type, key);
    };

    function goToChallenge(type, key) {
      navigation.navigate("Challenge", {
        type: type,
        challengeID: key,
      });
    }


    // function for input validation 
    function handleInput(id, badge, name, type, description, goal1, goal2, goal3, tags, imageFileName) {
  
      if (!badge) {
        alert("Please select a badge");
        return;
      }
      else if (!name) {
        alert("Please enter a challenge name");
        return;
      }
      else if (!description) {
        alert("Please enter a challenge description");
        return;
      }
      else if (!goal1) {
        alert("Please enter a goal");
        return;
      }
      else if (!goal2) {
        alert("Please enter a goal");
        return;
      }
      else if (!goal3) {
        alert("Please enter a goal");
        return;
      }
      else if (!tags) {
        alert("Please enter tags");
        return;
      }
      else if (!imageFileName) {
        alert("Please add a photo");
        return;
      }
      else {
        updateChallenge(id, badge, name, type, description, goal1, goal2, goal3, tags, imageFileName)
      }
    
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <Text style={styles.logo}>Update Challenge</Text>
            <View style={styles.inputContainer}>
            <Text style={styles.instructions}>
              Edit your challenge!
            </Text>
            <View style={styles.inputContainer}>
              <TextInput 
                value={this.state.name} 
                style={styles.input} 
                onChangeText={value => this.setState({ name: value})}
              />
              <SelectMultiple
                  items={this.state.badges}
                  selectedItems={this.state.selectedBadges}
                  onSelectionsChange={this.onSelectionsChange}
              />
                <TextInput value={this.state.description} 
                style={styles.input} 
                onChangeText={value => this.setState({ description: value})}
                />
                <TextInput value={this.state.goal1} 
                style={styles.input} 
                onChangeText={value => this.setState({ goal1: value})}
                />
                <TextInput value={this.state.goal2} 
                style={styles.input} 
                onChangeText={value => this.setState({ goal2: value})}
                />
                <TextInput value={this.state.goal3}  
                style={styles.input} 
                onChangeText={value => this.setState({ goal3: value})}
                />
                <TextInput value={this.state.tags} 
                style={styles.input} 
                onChangeText={value => this.setState({ tags: value})}
                />
              </View>
              <View style={styles.inputContainer}>
                  <Text style={styles.input}>Upload Challenge Image</Text>
                  <Button title="Pick an image from camera roll" onPress={this.pickImage} />
                  {this.state.image != null && 
                    (<Image 
                      source={{ uri: this.state.image }} 
                      style={{ width: 100, height: 100 }} 
                      />
                  )}
                  {!this.state.uploading ? <Button title="upload" onPress={this.uploadImage} /> : <ActivityIndicator size="small" color="#000" />}
              </View>    
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {handleInput(this.state.id, this.state.selectedBadges, this.state.name, this.state.type, this.state.description, this.state.goal1, this.state.goal2, this.state.goal3, this.state.tags, this.state.imageFileName)}} style={styles.button} >
                    <Text style={styles.buttonText}>Update Challenge</Text>
                </TouchableOpacity>
            </View>
          </View>
          </KeyboardAvoidingView>
      </ScrollView>
      
    );
  }

}



export default UpdateChallengeScreen;

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
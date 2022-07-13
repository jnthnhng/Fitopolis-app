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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';

// database imports
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { db, storage, firebaseConfig} from "../database/firebase.js";
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";
import { ref, onValue, push, update, remove, set, get } from "firebase/database";
import { ActivityIndicator } from "react-native-paper";


class CreateChallengeScreen extends Component {

  

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      badges: [],
      image: "",
      name: "",
      type: "",
      badge: "",
      description: "",
      goal1: "",
      goal2: "",
      goal3: "",
      tags: "",
      uploading: null,
      imageFileName: "",

    }
  }

  // get badge info for displaying
  componentDidMount() {
    this.getBadges();
  }

  getBadges = async () => {

    const snapshot = await get(ref(db, '/badges'))
    snapshot.forEach((child) => {
      var key = child.key;
      var data = child.val();
      this.setState(prevState => ({
        badges: [...prevState.badges, {key, data} ] 
      }));
    })
    
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
    const ref = firebase.storage().ref().child("/challengeImages/" + this.state.imageFileName)
    const snapshot = ref.put(blob)

    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, ()=>{
      this.setState({ uploading: true})
    }, 
    (error) => {
      this.setState({ uploading: false})
      console.log(error)
      blob.close()
      return
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        this.setState({ uploading: false})
        console.log("download url: ", url)
        blob.close()
        return url;
      })
    });

  }
  

  render() {

    function addNewChallenge(badge, name, type, description, goal1, goal2, goal3, tags, imageFileName) {
      
      const reference = ref(db, 'challenge/');
      
    
      push(reference, {
          badge: badge,
          challengeName: name,
          challengeType: type,
          description: description,
          goal1: goal1,
          goal2: goal2,
          goal3: goal3,
          tags: tags,
          image: ("/challengeImages/" + imageFileName),

      });
  }

    return (
      <View style={StyleSheet.container}>
        <Text style={styles.logo}>Create Challenge</Text>
        <Text style={styles.instructions}>
          Fill out the information below to create a challenge the Fitopolis
          Community can participate in!
        </Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Challenge Name" 
            style={styles.input} 
            onChangeText={value => this.setState({ name: value})}
          />
          <Picker 
            onValueChange={(value) => {
              this.setState({ type: value});
            }}
          > 
            <Picker.Item label="Pick a Challenge Type" value=""/>
            <Picker.Item label="Weight Lifting" value="Weight Lifting" />
            <Picker.Item label="Cycling" value="Cycling" />
            <Picker.Item label="Aerobics" value="Aerobics" />
            <Picker.Item label="Yoga" value="Yoga" />
            <Picker.Item label="Cardio" value="Cardio" />
            <Picker.Item label="Swimming" value="Swimming" />
            <Picker.Item label="Running" value="Running" />
          </Picker>
          <Picker
            onValueChange={(value) => {
              this.setState({ badge: value});
            }}
          >
            <Picker.Item label="Pick a Badge" value=""/>
            {this.state.badges.map(badge =>
              <Picker.Item label={badge.data.badgeName} value={badge.key} />  
            )}
          </Picker>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Description" 
            style={styles.input} 
            onChangeText={value => this.setState({ description: value})}
            />
            <TextInput placeholder="Goal 1" 
            style={styles.input} 
            onChangeText={value => this.setState({ goal1: value})}
             />
            <TextInput placeholder="Goal 2" 
            style={styles.input} 
            onChangeText={value => this.setState({ goal2: value})}
            />
            <TextInput placeholder="Goal 3" 
            style={styles.input} 
            onChangeText={value => this.setState({ goal3: value})}
            />
            <TextInput placeholder="Tags" 
            style={styles.input} 
            onChangeText={value => this.setState({ tags: value})}
            />
          </View>
          <View style={styles.inputContainer}>
              <Text style={styles.input}>Upload Challenge Image</Text>
              <Button title="Pick an image from camera roll" onPress={this.pickImage} />
              {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 100, height: 100 }} />}
              {!this.state.uploading?<Button title="upload" onPress={this.uploadImage} />:<ActivityIndicator size="small" color="#000"/>}
          </View>     
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {addNewChallenge(this.state.badge, this.state.name, this.state.type, this.state.description, this.state.goal1, this.state.goal2, this.state.goal3, this.state.tags, this.state.imageFileName)}} style={styles.button}>
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}


export default CreateChallengeScreen;

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

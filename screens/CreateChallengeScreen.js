import React, {Component, useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

// database imports
import { db, storage} from "../database/firebase.js";
import { ref, onValue, push, update, remove, set, get } from "firebase/database";

function addNewChallenge(
  challengeId,
  name,
  type,
  description,
  image,
  badge,
  goal1,
  goal2,
  goal3,
  tags
) {
  const reference = ref(db, "challenge/" + challengeId);

  set(reference, {
    challengeName: name,
    challengeType: type,
    description: description,
    challengeImage: image,
    challengeBadge: badge,
    challengeCreator: "?",
    goal1: goal1,
    goal2: goal2,
    goal3: goal3,
    tags: tags,
  });
}

class CreateChallengeScreen extends Component {

  constructor(props) {
    super(props);
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

    }
  }

  // get badge info for displaying
  componentDidMount() {
    this.getBadges();
  }

  getBadges = async () => {

    const snapshot = await get(ref(db, '/badges'));
    this.setState({badges : (snapshot.val())});
  }

  /*
  upload() {
    if(this.state.image == null)
      return;
    storage.ref('/challengeImages/' + 'test').put(this.state.image).on("state_changed", alert("success"), alert);
  }
  */

  render() {

    const onChangeDropDown = async (event, data) => {
      this.setState({ type: data});
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
          <Picker onChange={onChangeDropDown}>
            <Picker.Item label="Pick a Challenge Type" value="" />
            <Picker.Item label="Weight Lifting" value="Weight Lifting" />
            <Picker.Item label="Cycling" value="Cycling" />
            <Picker.Item label="Aerobics" value="Aerobics" />
            <Picker.Item label="Yoga" value="Yoga" />
            <Picker.Item label="Cardio" value="Cardio" />
            <Picker.Item label="Swimming" value="Swimming" />
            <Picker.Item label="Running" value="Running" />
          </Picker>
          <Picker>
            <Picker.Item label="Pick a Badge" value=""/>
            {this.state.badges.map(badge =>
              <Picker.Item label={badge.badgeName} value={badge} />  
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
              <input type="file" onChange={(e)=>this.setState({image : (e.target.files[0])})}/>
              <button onClick={console.log(this.state.type)}>Upload</button>
          </View>     
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.button}>
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

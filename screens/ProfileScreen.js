import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Database imports
import { getAuth, signOut, updateEmail, updatePassword } from "firebase/auth";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { db, storage, firebaseConfig } from "../database/firebase.js";
import {
  set,
  update,
  ref,
  getDatabase,
  onValue,
  get,
  child,
} from "firebase/database";
// storage imports for images
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";

import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fnName, setFName] = useState("");
  const [password, setPassword] = useState("");
  const [nameUploaded, setNameUploaded] = useState(false);
  const [usernameUploaded, setUserNameUploaded] = useState(false);

  // Get Current User Data
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  console.log("current user", auth.currentUser.uid);
  const db = getDatabase();

  // Handle name update
  const handleNameUpdate = () => {
    update(ref(db, "users/" + auth.currentUser.uid), {
      name: fnName,
    }).then(() => {
      console.log("name updated");
      setNameUploaded(true);
    });
  };

  // Handle name update
  const handleUserNameUpdate = () => {
    update(ref(db, "users/" + auth.currentUser.uid), {
      username: username,
    }).then(() => {
      console.log("name updated");
      setUserNameUploaded(true);
    });
  };

  // Handle Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Splash" }],
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {auth.currentUser == null ? (
        <>
          <Text>Please login to access data</Text>
          <View style={styles.buttonSOContainer}>
            <TouchableOpacity onPress={handleSignOut} style={styles.buttonSO}>
              <Text style={styles.buttonSOText}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Ionicons name="person-circle" size={60} />
          <Text style={styles.logo}>Edit Profile</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="First & Last Name"
              value={fnName}
              onChangeText={(text) => setFName(text)}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleNameUpdate}>
              <Text style={styles.update}>Update</Text>
            </TouchableOpacity>
            {nameUploaded && <Ionicons name="checkbox" size={20} />}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleUserNameUpdate}>
              <Text style={styles.update}>Update</Text>
            </TouchableOpacity>
            {usernameUploaded && <Ionicons name="checkbox" size={20} />}
          </View>
          {/* <Text style={styles.logo}>Edit Profile</Text>
          <Text style={styles.instructions}>Update Email & Password</Text>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
              placeholder={email}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <Text>Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleUnPWChange} style={styles.button}>
              <Text style={styles.buttonText}>Update Email & Password</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.instructions}>Update account information</Text>
          <View style={styles.inputContainer}>
            <Text>First & Last Name</Text>
            <TextInput
              placeholder={name}
              // value={}
              // onChangeText={text => }
              style={styles.input}
            />
            <Text>Username</Text>
            <TextInput
              placeholder={username}
              // value={}
              // onChangeText={text => }
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          */}
          <View style={styles.buttonSOContainer}>
            <TouchableOpacity onPress={handleSignOut} style={styles.buttonSO}>
              <Text style={styles.buttonSOText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

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
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "70%",
  },
  update: {
    fontSize: 15,
    paddingLeft: 5,
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

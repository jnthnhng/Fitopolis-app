// React Imports
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";
import { Avatar } from "react-native-paper";

// Database imports
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, storage, firebaseConfig } from "../database/firebase.js";
import { set, update, ref, getDatabase } from "firebase/database";
import { SafeAreaView } from "react-native";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [uploading, setUploading] = useState(null);
  const [transferred, setTransferred] = useState(null);

  // Handle Image Picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("RESULT: ", result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Upload image to storage
  // Adapted from Cat Wallin on her CreateChallengeScreen
  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    // Stores image under user in realtime database
    const imageFile = image.substring(image.lastIndexOf("/") + 1);
    console.log("Image File Name: ", imageFile);
    setImageFileName(imageFile);
    const ref = firebase
      .storage()
      .ref()
      .child("userImages/" + imageFile);
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(true);
        console.log(error);
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          // setUploading(true);
          setTransferred(true);
          console.log("download url: ", url);
          return url;
        });
      }
    );
  };

  // Handle Sign Up and Write User to DB
  const handleSignUp = () => {
    // Check for name text
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    // Check for username text
    else if (!username.trim()) {
      alert("Please enter a username");
      return;
    }
    // Check for email text
    else if (!email.trim()) {
      alert("Please enter an email");
      return;
    }
    // Check for password text - To Do
    else if (!password.trim()) {
      alert("Please enter a password");
      return;
    }
    // Check for photo upload
    else if (image == null) {
      alert("Please add a photo");
      return;
    } else {
      // Create user
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
        })
        // Upload user information to realtime database
        .then(() => {
          const db = getDatabase();
          set(ref(db, "users/" + auth.currentUser.uid), {
            email: email,
            username: username,
            name: name,
            profilePhoto: "userImages/" + imageFileName,
          });
        })
        // Navigate to home page
        .then(() => {
          navigation.navigate("Fitopolis");
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <SafeAreaView style={styles.container} behavior="padding">
      <Text style={styles.logo}>Fitopolis</Text>
      <Text style={styles.instructions}>
        Lets get fit! Enter your details to join the Fitopolis Community!
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First and Last Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <View style={styles.inputImage}>
          <Button
            title="Choose an image from camera roll"
            onPress={pickImage}
          />
          {image != null && transferred == null && (
            <View style={styles.inputImage}>
              <Avatar.Image source={{ uri: image }} size={110} />
              <Button title="upload" onPress={uploadImage} />
            </View>
          )}
          {transferred != null && <Text>Uploaded!</Text>}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  inputImage: {
    alignItems: "center",
    justifyContent: "center",
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
  imageButton: {
    backgroundColor: "#b3b2b1",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "left",
  },
  imageButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

// Database imports
import { getAuth, signOut, updateEmail, updatePassword } from 'firebase/auth';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import { db, storage, firebaseConfig } from '../database/firebase.js';
import {
  set,
  update,
  ref,
  getDatabase,
  onValue,
  get,
  child,
} from 'firebase/database';

// storage imports for images
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fnName, setFName] = useState('');
  const [password, setPassword] = useState('');
  const [nameUploaded, setNameUploaded] = useState(false);
  const [usernameUploaded, setUserNameUploaded] = useState(false);
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(null);
  const [transferred, setTransferred] = useState(null);
  const [url, setUrl] = useState('');
  const [imageFileName, setImageFileName] = useState(null);
  const [newImage, setNewImage] = useState(null);

  // Initialize auth and database
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  console.log('current user', auth.currentUser.uid);
  const db = getDatabase();

  // Handle name update
  const handleNameUpdate = () => {
    update(ref(db, 'users/' + auth.currentUser.uid), {
      name: fnName,
    }).then(() => {
      console.log('name updated');
      setNameUploaded(true);
    });
  };

  // Handle name update
  const handleUserNameUpdate = () => {
    update(ref(db, 'users/' + auth.currentUser.uid), {
      username: username,
    }).then(() => {
      console.log('name updated');
      setUserNameUploaded(true);
    });
  };

  // Handle profile photo update
  const handleProfileUpdate = (imageFile) => {
    console.log('Image File Name: ', imageFile);
    update(ref(db, 'users/' + auth.currentUser.uid), {
      profilePhoto: 'userImages/' + imageFile,
    }).then(() => {
      console.log('profile updated');
    });
  };

  // Handle Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Splash' }],
        });
      })
      .catch((error) => alert(error.message));
  };

  // Handle Image Picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('RESULT: ', result.uri);

    if (!result.cancelled) {
      setNewImage(result.uri);
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
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', newImage, true);
      xhr.send(null);
    });

    const imageFile = newImage.substring(newImage.lastIndexOf('/') + 1);
    console.log('Full Image Name: ', newImage);
    console.log('Image File Name: ', imageFile);
    setImageFileName(imageFile);
    const ref = firebase
      .storage()
      .ref()
      .child('userImages/' + imageFile);
    const snapshot = ref.put(blob);
    handleProfileUpdate(imageFile);

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
          setTransferred(true);
          console.log('download url: ', url);
          return url;
        });
      }
    );
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
          <Ionicons name="person-circle" size={80} color="#7f03fc" />
          <Text style={styles.logo}>EDIT PROFILE</Text>
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
          <View style={styles.inputImage}>
            <Button
              title="Choose an image from camera roll"
              onPress={pickImage}
            />
            {newImage != null && transferred == null && (
              <View style={styles.inputImage}>
                <Avatar.Image source={{ uri: newImage }} size={110} />
                <Button title="upload" onPress={uploadImage} />
              </View>
            )}
            {transferred != null && <Text>Uploaded!</Text>}
          </View>
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
    backgroundColor: '#e6e4df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: 'black',
    fontWeight: "200",
    fontSize: 40,
    marginBottom: 20,
    // fontFamily: 'Lato_900Black',
  },
  instructions: {
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '70%',
  },
  inputImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  update: {
    fontSize: 15,
    paddingLeft: 5,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonSOContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonSO: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3b3a39',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  buttonSOText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
});

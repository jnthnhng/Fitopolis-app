import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ProfileScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.logo}>Edit Profile</Text>
      <Text style={styles.instructions}>
        Update information below to edit your profile
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          // value={}
          // onChangeText={text => }
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          // value={}
          // onChangeText={text => }
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          // value={}
          // onChangeText={text => }
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Photo Upload (placeholder)"
          // value={}
          // onChangeText={text => }
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
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

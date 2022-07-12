import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAvoidingView } from "react-native";

const SplashScreen = ({ navigation }) => {
  function goToLogin() {
    navigation.navigate("Login");
  }
  function goToRegister() {
    navigation.navigate("Register");
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Ionicons name="barbell" size={70} />
      <Text style={styles.logo}>Fitopolis</Text>
      <TouchableOpacity testID="LoginButton" style={styles.button} onPress={goToLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="SignUpButton" style={styles.nonButton} onPress={goToRegister}>
        <Text style={styles.nonbuttonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  label: {
    marginBottom: 16,
    marginTop: 16,
  },
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
    marginBottom: 30,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: "#3b3a39",
    borderRadius: 10,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  nonButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  nonbuttonText: {
    color: "black",
    fontSize: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

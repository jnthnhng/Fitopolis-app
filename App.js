import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FitopolisHomeScreen from "./screens/FitopolisHomeScreen";
import CreateChallengeScreen from "./screens/CreateChallengeScreen";

// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/
// Used to help set up app with jest for CI

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Fitopolis" component={FitopolisHomeScreen} />
          <Stack.Screen name="Create" component={CreateChallengeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

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
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

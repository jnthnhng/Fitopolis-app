import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/
// Used to help set up app with jest for CI
export default function App() {
  const [counter, setCounter] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Fitopolis</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.label} testID={"counter"}>
        You clicked the button {counter} times.
      </Text>
      <Button
        testID={"button"}
        onPress={() => setCounter(counter + 1)}
        title={"Press me"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 16,
    marginTop:16,
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
    backgroundColor: '#3b3a39',
    borderRadius: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});

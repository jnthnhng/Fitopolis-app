import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth } from "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FitopolisHomeScreen from "./screens/FitopolisHomeScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import CreateChallengeScreen from "./screens/CreateChallengeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BadgesScreen from "./screens/BadgesScreen";
import StatsScreen from "./screens/StatsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import SearchScreen from "./screens/SearchScreen";
import ChallengeParticipationScreen from "./screens/ChallengeParticipationScreen";
// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/
// Used to help set up app with jest for CI

// For each screen, you must create a Stack Navigator which will point
// to the different screens that are navigated to from that screen (in buttons etc)
// See here for more information - https://medium.com/wesionary-team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181

// These stack navigators will be pointed to by the Tab navigator (below in the App function)
// You must include each screen that the current screen will navigate to in the stack navigatorsconst HomeStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  const auth = getAuth();
  console.log(auth);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Splash" component={SplashScreen} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Register" component={RegisterScreen} />
      <HomeStack.Screen name="Fitopolis" component={FitopolisHomeScreen} />
      <HomeStack.Screen name="Create" component={CreateChallengeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="Participate" component={ChallengeParticipationScreen} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="User Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Splash" component={SplashScreen} />
    </ProfileStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="My Favorites" component={FavoritesScreen} />
    </FavoritesStack.Navigator>
  );
}

const StatsStack = createNativeStackNavigator();

function StatsStackScreen() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="My Stats" component={StatsScreen} />
    </StatsStack.Navigator>
  );
}

const BadgesStack = createNativeStackNavigator();

function BadgesStackScreen() {
  return (
    <BadgesStack.Navigator>
      <BadgesStack.Screen name="My Badges" component={BadgesScreen} />
    </BadgesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              } else if (route.name === "Favorites") {
                iconName = focused ? "star" : "star-outline";
              } else if (route.name === "Stats") {
                iconName = focused ? "stats-chart" : "stats-chart-outline";
              } else if (route.name === "Badges") {
                iconName = focused ? "trophy" : "trophy-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Stats"
            component={StatsStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Badges"
            component={BadgesStackScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
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

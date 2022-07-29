import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth } from "firebase/auth";

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
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
import UpdateChallengeScreen from "./screens/UpdateChallengeScreen";
import CreatedChallengeScreen from "./screens/CreatedChallengeScreen";
import CompletedChallengesScreen from "./screens/CompletedChallenges";
import InProgressScreen from "./screens/InProgressScreen";
import WallofFameScreen from "./screens/WallofFameScreen";
import MilestoneScreen from "./screens/MilestoneScreen";
// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/
// Used to help set up app with jest for CI

// For each screen, you must create a Stack Navigator which will point
// to the different screens that are navigated to from that screen (in buttons etc)
// See here for more information - https://medium.com/wesionary-team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181

// These stack navigators will be pointed to by the Tab navigator (below in the App function)
// You must include each screen that the current screen will navigate to in the stack navigatorsconst HomeStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen({ navigation, route }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Fitopolis"
        component={FitopolisHomeScreen}
        options={{ unmountOnBlur: true }}
      />
      <HomeStack.Screen name="Created" component={CreatedChallengeScreen} />
      <HomeStack.Screen
        name="Completed"
        component={CompletedChallengesScreen}
      />
      <HomeStack.Screen
        name="In Progress"
        component={InProgressScreen}
        options={{ unmountOnBlur: true }}
      />
      <HomeStack.Screen name="Create" component={CreateChallengeScreen} />
      <HomeStack.Screen name="My Badges" component={BadgesScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="Challenge" component={ChallengeScreen} />
      <HomeStack.Screen name="Update" component={UpdateChallengeScreen} />
      <HomeStack.Screen
        name="Participate"
        component={ChallengeParticipationScreen}
      />
      <HomeStack.Screen name="Wall of Fame" component={WallofFameScreen} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="User Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="My Favorites" component={FavoritesScreen} />
      <FavoritesStack.Screen
        name="Participate"
        component={ChallengeParticipationScreen}
      />
      <FavoritesStack.Screen name="Wall of Fame" component={WallofFameScreen} />
    </FavoritesStack.Navigator>
  );
}

const StatsStack = createNativeStackNavigator();

function StatsStackScreen() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="Wall of Fame" component={WallofFameScreen} />
    </StatsStack.Navigator>
  );
}

const BadgesStack = createNativeStackNavigator();

function BadgesStackScreen() {
  return (
    <BadgesStack.Navigator>
      <BadgesStack.Screen name="Milestones" component={MilestoneScreen} />
    </BadgesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
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
          } else if (route.name === "Milestones") {
            iconName = focused ? "ribbon" : "ribbon-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7f03fc",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStackScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsStackScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Milestones"
        component={BadgesStackScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  const auth = getAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.currentUser == null ? (
          <>
            <Stack.Group initialRouteName={"Splash"}>
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen
                name="Fitopolis"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Group>
              <Stack.Screen
                name="Fitopolis"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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

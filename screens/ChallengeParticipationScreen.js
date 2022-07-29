import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  useTheme,
  List,
  Checkbox,
  IconButton,
} from "react-native-paper";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { set, ref, getDatabase, push, get, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

import * as ImagePicker from "expo-image-picker";

/**
 * Retrieve the screen size for a more responsive layout
 */
const screenWidth = Dimensions.get("window").width;
const numColumns = 1;
const tileSize = screenWidth / numColumns;

/**
 * A component that renders a Card component with buttons that will allow
 * users to Particpate, mark as Complete, Post, and or Share.
 */
const ChallengeParticipationScreen = ({ navigation, ...props }) => {
  // console.log(props);
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState(true);
  const [checkedGoal1, setCheckedGoal1] = React.useState(false);
  const [checkedGoal2, setCheckedGoal2] = React.useState(false);
  const [checkedGoal3, setCheckedGoal3] = React.useState(false);
  const [key, setKey] = React.useState(null);
  const [challengeID, setChallengeID] = React.useState(null);

  const handlePress = () => setExpanded(!expanded);

  const Header = () => {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.primary }}> Header</Text>
      </View>
    );
  };

  /**
   * Allow the user to pick a photo from their library to upload.
   * Implementation is still in progress
   */
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addFavorite = (type, key) => {
    // Create path to challenge with type and key
    const challengeId = type + "/" + key;
    console.log(challengeId);
    // Initiate database and get user ID of currently logged in user
    const db = getDatabase();
    const auth = getAuth();
    // Create database reference
    const postListRef = ref(
      db,
      "users/" + auth.currentUser.uid + "/favorites/"
    );
    const newPostRef = push(postListRef);
    // Set child as challenge ID
    set(newPostRef, {
      challenge: challengeId,
    });
  };

  const addToInProgress = () => {
    // adds to in progress under user profile

    const auth = getAuth();
    const db = getDatabase();
    const challengeId =
      props.route.params.challenges.val().challengeType +
      "/" +
      props.route.params.challenges.key;
    let inProgress = false;

    const snapshot = get(
      ref(db, "users/" + auth.currentUser.uid + "/progress")
    ).then((snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.val().challenge);
        console.log(challengeId);
        if (child.val().challenge == challengeId) {
          inProgress = true;
        }
      });

      if (!inProgress) {
        // Create database reference
        const postListRef = ref(
          db,
          "users/" + auth.currentUser.uid + "/progress/"
        );
        const newPostRef = push(postListRef);
        // Set child as challenge ID
        set(newPostRef, {
          challenge: challengeId,
        });
        alert("Success!");
      } else {
        alert("You are already participating in this challenge!");
      }
    });
  };

  const goToWallofFame = () => {
    const auth = getAuth();

    // checks to see if user completed all three goals
    if (!checkedGoal1 || !checkedGoal2 || !checkedGoal3) {
      alert(
        "You must complete all three goals before completing this challenge!"
      );
      return;
    }

    // Add user to Challenge
    const db = getDatabase();

    // Add badges to user profile
    const reference = ref(db, "users/" + auth.currentUser.uid + "/badges/");
    for (const badge of props.route.params.challenges.val().badge) {
      push(reference, {
        badge: badge.value,
      });
    }

    // Add challenge to completed section of user profile
    const referenceComplete = ref(
      db,
      "users/" + auth.currentUser.uid + "/completed/"
    );
    push(referenceComplete, {
      challenge:
        props.route.params.challenges.val().challengeType +
        "/" +
        props.route.params.challenges.key,
    });

    // Add in progress to challenge ID
    // Create database reference
    const postListRef = ref(
      db,
      "challenge/" +
        props.route.params.challenges.val().challengeType +
        "/" +
        props.route.params.challenges.key +
        "/completedUsers/"
    );
    const newPostRef = push(postListRef);

    // Set child as challenge ID
    set(newPostRef, {
      user: auth.currentUser.uid,
    });

    // If user has challenge in progress, remove from in progress
    const challengeURI =
      props.route.params.challenges.val().challengeType +
      "/" +
      props.route.params.challenges.key;
    const referenceTwo = "users/" + auth.currentUser.uid + "/progress/";

    // Call database to get In progress items
    get(ref(db, referenceTwo)).then((snapshot) => {
      // Loop through them and get the challenge information from each favorited item
      // These are stored in the challenges array
      if (snapshot.exists()) {
        snapshot.forEach((element) => {
          if (element.val().challenge == challengeURI) {
            const removeRef = ref(
              db,
              "users/" + auth.currentUser.uid + "/progress/" + element.key
            );
            remove(removeRef);
          }
        });
      }
    });

    // Navigate to Wall of Fame
    navigation.navigate("Wall of Fame", {
      challengeID: props.route.params.challenges.key,
      challengeType: props.route.params.challenges.val().challengeType,
    });
  };

  /**
   *  A card component to render a chard with challenge data from the data base
   * @returns
   */
  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="weight-lifter" />
  );

  const ChallengeCard = () => {
    return (
      <Card mode={"outlined"} style={styles.cardBorder}>
        <Card.Title
          title={props.route.params.challenges.val().challengeType}
          //   subtitle="Bench"
          left={LeftContent}
          right={() => (
            <IconButton
              icon="star"
              color={"yellow"}
              size={35}
              onPress={() =>
                addFavorite(
                  props.route.params.challenges.val().challengeType,
                  props.route.params.challenges.key
                )
              }
              // onPress={() => console.log('Pressed')}
              animated={true}
            />
          )}
        />
        <Card.Content>
          <Title>{props.route.params.challenges.val().challengeName}</Title>
          <Paragraph>
            Description: {props.route.params.challenges.val().description}
          </Paragraph>

          <List.Section>
            <List.Subheader>Goals</List.Subheader>
            {/* <List.Item
            title="First Item"
            left={() => <List.Icon icon="folder" />}
          /> */}

            <List.Item
              title={props.route.params.challenges.val().goal1}
              // left={() =>  <List.Icon color={'red'} icon="folder" />}
              right={() => (
                <Checkbox.Android
                  status={checkedGoal1 ? "checked" : "unchecked"}
                  onPress={() => {
                    setCheckedGoal1(!checkedGoal1);
                  }}
                />
              )}
            />
            <List.Item
              title={props.route.params.challenges.val().goal2}
              // left={() => <List.Icon color={'red'} icon="folder" />}
              right={() => (
                <Checkbox.Android
                  status={checkedGoal2 ? "checked" : "unchecked"}
                  onPress={() => {
                    setCheckedGoal2(!checkedGoal2);
                  }}
                />
              )}
            />

            <List.Item
              title={props.route.params.challenges.val().goal3}
              // left={() => <List.Icon color={'red'} icon="folder" />}
              right={() => (
                <Checkbox.Android
                  status={checkedGoal3 ? "checked" : "unchecked"}
                  onPress={() => {
                    setCheckedGoal3(!checkedGoal3);
                  }}
                />
              )}
            />
          </List.Section>

          <Paragraph>
            Tags: {props.route.params.challenges.val().tags}
          </Paragraph>
          <Paragraph></Paragraph>
        </Card.Content>
        <Card.Cover
          source={{
            uri: "https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cnVubmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          }}
        />
        <Card.Actions style={styles.cardActionText}>
          <Button onPress={addToInProgress}>Participate</Button>
          <Button onPress={goToWallofFame}>Complete</Button>
          <Button onPress={pickImage}>Post </Button>
          <Button onPress={pickImage}>Share </Button>
        </Card.Actions>
      </Card>
    );
  };

  const challengeArry = new Array(1).fill(<ChallengeCard />);
  const [challenges, setChallenges] = useState(challengeArry);

  function renderChallenges({ challenge }) {
    return <ChallengeCard />;
  }

  return (
    <ScrollView style={styles.cardContainer}>
      <View style={styles.inputContainer}>
        <Header />
        <FlatList
          data={challenges}
          renderItem={renderChallenges}
          ItemsSeparatorComponent={() => <View style={{ height: 1 }} />}
          numColumns={1}
          key={1}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flex: 0.7,
  },
  text: {
    flex: 1,
    // color: colors.primary,
    fontSize: 20,
  },
  cardContainer: {
    // flex: .05,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 50,
    // flexDirection: 'row',
  },
  inputContainer: {
    width: screenWidth,
  },
  cardActionText: {
    backgroundColor: "#FFFFFF",
  },
  cardBorder: {
    flex: 1,
    backgroundColor: "#96A6BC",
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    marginBottom: 15,
    // height: tileSize,
    width: tileSize,
  },
});

export default ChallengeParticipationScreen;

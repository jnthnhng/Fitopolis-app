import React, { useState } from 'react';
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
  Divider,
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { set, ref, getDatabase, push, get, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import useFonts from '../components/useFonts';
import AppLoading from 'expo-app-loading';

/**
 * Retrieve the screen size for a more responsive layout
 */
const screenWidth = Dimensions.get('window').width;
const numColumns = 1;
const tileSize = screenWidth / numColumns;

/**
 * A component that renders a Card component with buttons that will allow
 * users to Particpate, mark as Complete, Post, and or Share.
 */
const ChallengeParticipationScreen = ({ navigation, ...props }) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState(true);
  const [checkedGoal1, setCheckedGoal1] = React.useState(false);
  const [checkedGoal2, setCheckedGoal2] = React.useState(false);
  const [checkedGoal3, setCheckedGoal3] = React.useState(false);
  const [key, setKey] = React.useState(null);
  const [challengeID, setChallengeID] = React.useState(null);

  const handlePress = () => setExpanded(!expanded);

  // // Load fonts
  // const [IsReady, SetIsReady] = useState(false);


  const LoadFonts = async () => {
    await useFonts();
  };
  LoadFonts();

  /**
   * Allow the user to pick a photo from their library to upload.
   * Implementation is still in progress
   */
  const [image, setImage] = useState(null);

  // Retrieve the image from Firebase Storage
  var storage = getStorage();
  const reference = sRef(storage, props.route.params.challenges.val().image);
  getDownloadURL(reference).then((x) => {
    setImage(x);
  });

  // Star icon functionality where a user can favorite the challenge
  const addFavorite = (type, key) => {
    // Create path to challenge with type and key
    const challengeId = type + '/' + key;

    // Initiate database and get user ID of currently logged in user
    const db = getDatabase();
    const auth = getAuth();

    // Create database reference
    const postListRef = ref(
      db,
      'users/' + auth.currentUser.uid + '/favorites/'
    );
    const newPostRef = push(postListRef);

    // Set child as challenge ID
    set(newPostRef, {
      challenge: challengeId,
    });
  };

  // Participate button functionality where a user can click to participate
  // and it will add to their in-progress challenges.
  const addToInProgress = () => {
    // adds to in progress under user profile
    const auth = getAuth();
    const db = getDatabase();

    // Get the challenge ID from the database
    const challengeId =
      props.route.params.challenges.val().challengeType +
      '/' +
      props.route.params.challenges.key;

    let inProgress = false;

    const snapshot = get(
      ref(db, 'users/' + auth.currentUser.uid + '/progress')
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
          'users/' + auth.currentUser.uid + '/progress/'
        );
        const newPostRef = push(postListRef);
        // Set child as challenge ID
        set(newPostRef, {
          challenge: challengeId,
        });
        alert('Success!');
      } else {
        alert('You are already participating in this challenge!');
      }
    });
  };

  // A function that checks if the user has checked and completed all three goals.
  // It will then add them to the wall of fame.
  const goToWallofFame = () => {
    const auth = getAuth();

    // checks to see if user completed all three goals
    if (!checkedGoal1 || !checkedGoal2 || !checkedGoal3) {
      alert(
        'You must complete all three goals before completing this challenge!'
      );
      return;
    }

    // Add user to Challenge
    const db = getDatabase();

    // Add badges to user profile
    const reference = ref(db, 'users/' + auth.currentUser.uid + '/badges/');
    for (const badge of props.route.params.challenges.val().badge) {
      push(reference, {
        badge: badge.value,
      });
    }

    // Add challenge to completed section of user profile
    const referenceComplete = ref(
      db,
      'users/' + auth.currentUser.uid + '/completed/'
    );
    push(referenceComplete, {
      challenge:
        props.route.params.challenges.val().challengeType +
        '/' +
        props.route.params.challenges.key,
    });

    // Add in progress to challenge ID
    // Create database reference
    const postListRef = ref(
      db,
      'challenge/' +
        props.route.params.challenges.val().challengeType +
        '/' +
        props.route.params.challenges.key +
        '/completedUsers/'
    );
    const newPostRef = push(postListRef);

    // Set child as challenge ID
    set(newPostRef, {
      user: auth.currentUser.uid,
    });

    // If user has challenge in progress, remove from in progress
    const challengeURI =
      props.route.params.challenges.val().challengeType +
      '/' +
      props.route.params.challenges.key;
    const referenceTwo = 'users/' + auth.currentUser.uid + '/progress/';

    // Call database to get In progress items
    get(ref(db, referenceTwo)).then((snapshot) => {
      // Loop through them and get the challenge information from each favorited item
      // These are stored in the challenges array
      if (snapshot.exists()) {
        snapshot.forEach((element) => {
          if (element.val().challenge == challengeURI) {
            const removeRef = ref(
              db,
              'users/' + auth.currentUser.uid + '/progress/' + element.key
            );
            remove(removeRef);
          }
        });
      }
    });

    // Navigate to Wall of Fame
    navigation.navigate('Wall of Fame', {
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

  // A card component to display the challenges
  const ChallengeCard = () => {
    return (
      <Card mode={'outlined'} style={styles.card}>
        <Card.Title
          title={props.route.params.challenges.val().challengeType}
          left={LeftContent}
          right={() => (
            <IconButton
              icon="star"
              color={'yellow'}
              size={35}
              onPress={() =>
                addFavorite(
                  props.route.params.challenges.val().challengeType,
                  props.route.params.challenges.key
                )
              }
              animated={true}
            />
          )}
        />

        <Card.Content>
          <Title>{props.route.params.challenges.val().challengeName}</Title>

          <Paragraph>
            Description: {props.route.params.challenges.val().description}
          </Paragraph>

          <Divider style={styles.divider} />

          <List.Section style={styles.text}>
            <List.Subheader style={styles.text}>Goals</List.Subheader>

            <List.Item
              title={props.route.params.challenges.val().goal1}
              // left={() =>  <List.Icon color={'red'} icon="folder" />}
              right={() => (
                <Checkbox.Android
                  status={checkedGoal1 ? 'checked' : 'unchecked'}
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
                  status={checkedGoal2 ? 'checked' : 'unchecked'}
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
                  status={checkedGoal3 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setCheckedGoal3(!checkedGoal3);
                  }}
                />
              )}
            />
            <Divider style={styles.divider} />
          </List.Section>

          <Paragraph>
            Tags: {props.route.params.challenges.val().tags}
          </Paragraph>
        </Card.Content>

        <Card.Cover
          source={{
            uri: image,
          }}
        />
        <Card.Actions style={styles.cardActionText}>
          <Button onPress={addToInProgress}>Participate</Button>
          <Button onPress={goToWallofFame}>Complete</Button>
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
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.cardContainer}>
        <FlatList
          data={challenges}
          renderItem={renderChallenges}
          ItemsSeparatorComponent={() => <View style={{ height: 1 }} />}
          numColumns={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 0.7,
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Lato-BoldItalic'
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',

    flexDirection: 'column',
  },
  inputContainer: {
    width: screenWidth,
  },
  cardActionText: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    backgroundColor: '#D3D1D4',
    height: '50%',
    width: '100%',
  },
  divider: {
    backgroundColor: '#343434',
    padding: 1,
  },
});

export default ChallengeParticipationScreen;

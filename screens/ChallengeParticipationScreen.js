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
} from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';

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
  // console.log(props);
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState(true);
  const [checkedGoal1, setCheckedGoal1] = React.useState(false);
  const [checkedGoal2, setCheckedGoal2] = React.useState(false);
  const [checkedGoal3, setCheckedGoal3] = React.useState(false);

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

  /**
   *  A card component to render a chard with challenge data from the data base
   * @returns
   */
  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="weight-lifter" />
  );

  const ChallengeCard = () => {
    return (
      <Card mode={'outlined'} style={styles.cardBorder}>
        <Card.Title
          title={props.route.params.challenges.val().challengeType}
          //   subtitle="Bench"
          left={LeftContent}
          right={() => (
            <IconButton
              icon="star"
              color={"yellow"}
              size={35}
              onPress={() => console.log('Pressed')}
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
                <Checkbox
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
                <Checkbox
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
                <Checkbox
                  status={checkedGoal3 ? 'checked' : 'unchecked'}
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
            uri: 'https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cnVubmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <Card.Actions style={styles.cardActionText}>
          <Button>Participate</Button>
          <Button>Complete</Button>
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
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#FFFFFF',
  },
  cardBorder: {
    flex: 1,
    backgroundColor: '#96A6BC',
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    marginBottom: 15,
    // height: tileSize,
    width: tileSize,
  },
});

export default ChallengeParticipationScreen;

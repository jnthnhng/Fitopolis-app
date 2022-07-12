import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const ChallengeParticipationScreen = ({ navigation }) => {
  const Header = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Header</Text>
      </View>
    );
  };

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="weight-lifter" />
  );

  const ChallengeCard = () => {
    return (
      <Card mode={'outlined'} style={styles.cardBorder}>
        <Card.Title
          title="Running"
          //   subtitle="Bench"
          left={LeftContent}
        />
        <Card.Content>
          <Title>5K</Title>
          <Paragraph>Run 5K in 5 minutes for an awesome badge!</Paragraph>
        </Card.Content>
        <Card.Cover
          source={{
            uri: 'https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cnVubmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <Card.Actions style={styles.cardActionText}>
          <Button>Participate</Button>
          <Button>Complete</Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Header /> */}
        <ChallengeCard />
        <ChallengeCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flex: 0.7,
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
  cardActionText: {
    backgroundColor: '#FFFFFF',
  },
  cardBorder: {
    flex: 0.3,
    backgroundColor: "#6486B6",
    borderWidth: 3,
    padding: 5,
    marginBottom: 15
  }
});

export default ChallengeParticipationScreen;

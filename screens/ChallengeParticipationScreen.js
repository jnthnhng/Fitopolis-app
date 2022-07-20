import { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  DataTable,
  Checkbox,
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;
const numColumns = 1;
const tileSize = screenWidth / numColumns;

const ChallengeParticipationScreen = ({ navigation }) => {
  const Header = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Header</Text>
      </View>
    );
  };
  //*************** ImagePicker */

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  //*************************/
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
          <Button onPress={pickImage}>Post </Button>
          <Button onPress={pickImage}>Share </Button>
        </Card.Actions>
      </Card>
    );
  };

  const optionsPerPage = [2, 3, 4];

  const ChallengesContainer = () => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    const [checked, setChecked] = React.useState(false);
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Challenges</DataTable.Title>
          <DataTable.Title numeric>Distance</DataTable.Title>
          <DataTable.Title numeric>Complete</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Running</DataTable.Cell>
          <DataTable.Cell numeric>5</DataTable.Cell>
          <DataTable.Cell numeric>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
      </DataTable>
    );
  };

  const challengeArry = new Array(5).fill(<ChallengeCard />);
  const [challenges, setChallenges] = useState(challengeArry);

  function renderChallenges({ challenge }) {
    return <ChallengeCard />;
  }

  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.inputContainer}>
        <FlatList
          data={challenges}
          renderItem={renderChallenges}
          ItemsSeparatorComponent={() => <View style={{ height: 1 }} />}
          numColumns={1}
          key={1}
        />
      </View>
      
    </SafeAreaView>

    // <ScrollView>

    //   <View style={styles.container}>
    //     {/* <Header /> */}
    //     <ChallengeCard />

    //     <ChallengesContainer />
    //   </View>
    // </ScrollView>
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
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    flexDirection: 'row',
  },
  inputContainer: {
    width: screenWidth,
  },
  cardActionText: {
    backgroundColor: '#FFFFFF',
  },
  cardBorder: {
    flex: 0.3,
    backgroundColor: '#6486B6',
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    marginBottom: 15,
    height: tileSize,
    width: tileSize,
  },
});

export default ChallengeParticipationScreen;

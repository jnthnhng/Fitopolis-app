import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { ScrollView } from 'react-native-gesture-handler';
import SearchChips from '../components/FitnessChips';
import GetChallenges from '../components/GetChallenges';

function goToChallengeParticipationScreen() {
  navigation.navigate('Participate');
}

const SearchScreen = ({ navigation }) => {
  const [queryKey, setQueryKey] = useState('');

  const initialState = {
    queryKey: '',
  };

  const resetState = () => {
    setQueryKey(initialState);
  };

  useEffect(() => {
    resetState;
  }, [queryKey]);

  // ************* Font Loading ********************

  // useFonts() returns a boolean depending on if the fonts are ready, or an error
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  // **************************************

  const SearchHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}> Search </Text>
      </View>
    );
  };

  const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query) => setSearchQuery(query);

    return (
      <Searchbar
        style={styles.searchBarContainer}
        inputStyle={{ backgroundColor: 'white' }}
        icon="search-web"
        iconColor="green"
        clearIcon="delete"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={() => setQueryKey(searchQuery)}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View>
          <Text onPress={goToChallengeParticipationScreen}> Participate</Text>
        </View> */}
      <SearchHeader />
      <SearchBar />
      <SearchChips navigation={navigation} />
      <GetChallenges navigation={navigation} searchType={queryKey} />
      {resetState}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#e6e4df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    width: '95%',
    // height: '10%',
    backgroundColor: '#e6e4df',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  resultsBoxContainer: {
    width: '95%',
    height: '100%',
    backgroundColor: '#e6e4df',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 200,
    paddingBottom: 200,

    // flexWrap: 'wrap',
  },
  text: {
    fontSize: 21,
    color: 'black',
    // paddingVertical: 5,
    // fontFamily: 'ProximaNova',
    fontFamily: 'Inter_900Black',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default SearchScreen;

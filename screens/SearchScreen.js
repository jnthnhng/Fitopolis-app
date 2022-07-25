import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import SearchChips from '../components/FitnessChips';
import GetChallenges from '../components/GetChallenges';

/**
 * Search screen component that renders the Search screen.
 * The screen contains a header for the title of the screen,
 * a search bar that allows users to search by keyword,
 * and chips of the type of fitness challenges available. The
 * fitness chips allows users to quickly pull up challenges based on challenge type.
 */
const SearchScreen = ({ navigation, ...props }) => {
  console.log(props);
  const [queryKey, setQueryKey] = useState('');

  /**
   * initialState, resetState function, and the useEffect is still a work in progress.
   * The plan is to reset the initial state so the intial search message is not retained
   * with future renders.
   */
  const initialState = {
    queryKey: '',
  };

  function resetQuery() {
    console.log('resetQuery');
    setQueryKey(initialState.queryKey);
  }

  /**
   * A component that returns a View of the Header
   * @returns {View} Search   Header of the screen
   */
  const SearchHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}> Search </Text>
      </View>
    );
  };

  /**
   * A SearchBar components that allows users to enter a search word. Left Icon is used to
   * submit the search, which then is saved to "query".
   * @returns {String} search value
   */
  const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState([]);
    const onChangeSearch = (query) => setSearchQuery(query);

    return (
      <>
        <Searchbar
          style={styles.searchBarContainer}
          inputStyle={{ backgroundColor: 'white' }}
          icon="search-web"
          iconColor="#6200ee"
          clearIcon="delete"
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={() => setQueryKey(searchQuery)}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => setQueryKey(initialState.queryKey)}
          >
            Show All
          </Button>
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SearchHeader />
      <SearchBar />
      <SearchChips navigation={navigation} />
      <View>
        <Text>Search Screen Results</Text>
      </View>
      <GetChallenges navigation={navigation} searchType={queryKey} />
      {/* {resetState} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    // paddingBottom: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  header: {
    width: '100%',
    height: '10%',
    // backgroundColor: '#e6e4df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    flex: 1,
    width: '95%',
    // height: '10%',
    backgroundColor: '#e6e4df',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },

  text: {
    fontSize: 25,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    // alignContent: 'center',
    // backgroundColor: '#DDDDDD',
    // padding: 10,
    width: '40%',
    marginLeft: '35%',
    marginRight: '35%',
    marginTop: '1%',
    marginBottom: '1%',
  },
});

export default SearchScreen;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import SearchChips from '../components/FitnessChips';
import GetChallenges from '../components/GetChallenges';
import GetFonts from '../components/getFonts';

/**
 * Search screen component that renders the Search screen.
 * The screen contains a header for the title of the screen,
 * a search bar that allows users to search by keyword,
 * and chips of the type of fitness challenges available. The
 * fitness chips allows users to quickly pull up challenges based on challenge type.
 */
const SearchScreen = ({ navigation }) => {
  const [queryKey, setQueryKey] = useState('');

  /**
   * initialState, resetState function, and the useEffect is still a work in progress.
   * The plan is to reset the initial state so the intial search message is not retained
   * with future renders.
   */
  const initialState = {
    queryKey: '',
  };

  const resetState = () => {
    setQueryKey(initialState);
  };

  useEffect(() => {
    resetState;
  }, [queryKey]);

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
    const [searchQuery, setSearchQuery] = useState('');
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
    fontSize: 25,
    color: 'black',
    fontFamily: 'Lato_400Regular',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default SearchScreen;

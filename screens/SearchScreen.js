import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Searchbar, Button, Divider } from 'react-native-paper';
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
  const [queryKey, setQueryKey] = useState('');

  if (
    props.route.params != null &&
    props.route.params.searchType &&
    props.route.params.searchType != queryKey
  ) {
    setQueryKey(props.route.params.searchType);
  }

  /**
   * initialState, resetState function, and the useEffect is still a work in progress.
   * The plan is to reset the initial state so the intial search message is not retained
   * with future renders.
   */
  const initialState = {
    queryKey: '',
  };

  function resetQuery() {
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
          onIconPress={() => (
            setQueryKey(searchQuery), (props.route.params.searchType = '')
          )}
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
      {/* <SearchHeader /> */}
      <SearchBar />
      <Divider style={styles.divider} />
      <SearchChips navigation={navigation} />
      <Divider style={styles.divider} />
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsHeader}>Results</Text>
      </View>
      {/* <Divider style={styles.divider} /> */}
      <GetChallenges navigation={navigation} searchType={queryKey} />
      {/* {resetState} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 5,
    // paddingBottom: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',-
    // paddingHorizontal: 10,
  },
  divider: {
    backgroundColor: '#E7E5E0',
    borderColor: '#E7E5E0',
    borderWidth: 0.5,
  },
  header: {
    width: '100%',
    height: 40,
    // backgroundColor: '#e6e4df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsHeader: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
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
});

export default SearchScreen;

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Searchbar, Button, Divider } from 'react-native-paper';
import SearchChips from '../components/FitnessChips';
import GetChallenges from '../components/GetChallenges';
import useFonts from '../components/useFonts';
import AppLoading from 'expo-app-loading';
// import { useFonts } from 'expo-font';
/**
 * Search screen component that renders the Search screen.
 * The screen contains a header for the title of the screen,
 * a search bar that allows users to search by keyword,
 * and chips of the type of fitness challenges available. The
 * fitness chips allows users to quickly pull up challenges based on challenge type.
 */
const SearchScreen = ({ navigation, ...props }) => {
  const [queryKey, setQueryKey] = useState('');

  // Load fonts
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {
          console.log('Font Loading Error');
        }}
      />
    );
  }

  // Check to see if there are parameters passed from other components,
  // and the search query is not the same that is currently displayed
  if (
    props.route.params != null &&
    props.route.params.searchType &&
    props.route.params.searchType != queryKey
  ) {
    setQueryKey(props.route.params.searchType);
  }

  /**
   * showAll object contains a queryKey that is an empty string to query All challenges.
   */
  const showAll = {
    queryKey: '',
  };

  /**
   * A SearchBar components that allows users to enter a search for word. Left Icon is used to
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
            onPress={() => setQueryKey(showAll.queryKey)}
          >
            Show All
          </Button>
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <SearchBar />
        </View>
        <View>
          <Divider style={styles.divider} />
        </View>
        <View>
          <SearchChips navigation={navigation} />
        </View>

        <View>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsHeader}>Results</Text>
        </View>
        <View>
          <GetChallenges navigation={navigation} searchType={queryKey} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '40%',
    marginLeft: '35%',
    marginRight: '35%',
    marginTop: '1%',
    marginBottom: '1%',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 5,
    flexWrap: 'wrap',
  },
  divider: {
    backgroundColor: '#E7E5E0',
    borderColor: '#E7E5E0',
    borderWidth: 0.5,
  },
  resultsHeader: {
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'justify',
    fontFamily: 'Lato-BlackItalic',
  },
  searchBarContainer: {
    width: '95%',
    backgroundColor: '#e6e4df',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
  },
});

export default SearchScreen;

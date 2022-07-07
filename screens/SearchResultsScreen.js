import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import SearchScreen from './SearchScreen';
import { SearchBar } from 'react-native-screens';

const SearchResultsScreen = ({ navigation }) => {
  function goToSearchScreen() {
    navigation.navigate('Search');
  }

  return (
    <View style={styles.container}>
      <Text>Search Results</Text>
      <Text> Go to</Text>
      <TouchableOpacity style={styles.button} onPress={goToSearchScreen}>
        <Text> Search Screen </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default SearchResultsScreen;

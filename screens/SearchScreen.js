import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';


const SearchScreen = ({ navigation }) => {
//   function goToSearchResults() {
//     navigation.navigate('SearchResults');
//   }

//   let [loaded] = useFonts({
//     ProximaNova: require('../assets/fonts/Proxima_Nova.otf'),
//     ModernNo20: require('../assets/fonts/Modern_No_20.ttf'),
//   });

  // **************************************

  const SearchHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}> Search </Text>
      </View>
    );
  };

  const SectionListBasics = () => {
    return (
      <View style={styles.resultsBoxContainer}>
        <SectionList
          sections={[
            { title: 'Running', data: ['5K', '10K', '15K'] },
            {
              title: 'Swimming',
              data: ['25m', '50m', '100m', '200m', '500m'],
            },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => `basicListEntry-${item.title}`}
        />
      </View>
    );
  };

  const SearchBarBasic = () => {
    return (
      <SearchBar
        inputStyle={{ backgroundColor: 'white' }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 5,
          margin: 10,
        }}
        placeholderTextColor={'#c8c8c8'}
        placeholder={'Text here'}
      />
    );
  };
  const SearchResults = () => {
    return (
      <View style={styles.resultsBoxContainer}>
        <Text> Results </Text>
      </View>
    );
  };

  // **************************************

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader />
      <SearchBarBasic />
      <SectionListBasics />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  header: {
    width: '100%',
    height: '15%',
    backgroundColor: '#c8c8c8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    width: '95%',
    height: '10%',
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  resultsBoxContainer: {
    width: '95%',
    height: '100%',
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  text: {
    fontSize: 40,
    color: 'black',
    paddingVertical: 10,
    fontFamily: 'ProximaNova'
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

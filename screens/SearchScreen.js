import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { ScrollView } from 'react-native-gesture-handler';
import SearchChips from '../components/FitnessChips'
import GetChallenges from '../components/searchFunctions';
import SectionListResults from '../components/SectionListComponent';
import MyComponent from '../components/ListItemComponent';


const SearchScreen = ({ navigation }) => {
  function goToChallengeParticipationScreen() {
    navigation.navigate('Participate');
  }

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

  // const SectionListBasics = () => {
  //   return (
  //     <View style={styles.resultsBoxContainer}>
  //       <SectionList
  //         sections={[
  //           { title: 'Running', data: ['5K', '10K', '15K'] },
  //           {
  //             title: 'Swimming',
  //             data: ['25m', '50m', '100m', '200m', '500m'],
  //           },
  //         ]}
  //         renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
  //         renderSectionHeader={({ section }) => (
  //           <Text style={styles.sectionHeader}>{section.title}</Text>
  //         )}
  //         keyExtractor={(item, index) => item + index}
  //       />
  //     </View>
  //   );
  // };

  const SearchBarBasic = () => {
    return (
      <Searchbar
        style={styles.searchBarContainer}
        inputStyle={{ backgroundColor: 'white' }}
        placeholderTextColor={'#c8c8c8'}
        placeholder={'Text here'}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text onPress={goToChallengeParticipationScreen}> Participate</Text>
        </View>
        <SearchHeader />
        <SearchBarBasic />
        <SearchChips/>
        <GetChallenges searchType = "Running" />
        {/* <SectionListBasics /> */}
        {/* <MyComponent /> */}
      </ScrollView>
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

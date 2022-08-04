import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Chip } from 'react-native-paper';

/**
 * A Chip component that renders challenge types as chips. This lets user quickly pull up results
 * based on the key of the chips.
 *
 * @param {Object} navigation     Navigation Objects
 * @returns {View}                A view components with the fitness chips and the results
 */
const SearchChips = ({ ...props }) => {
  // Initialize a state for the key to be used to query
  const [query, setQuery] = useState('');

  // A hook that is used to display results based on changes to the query state.
  useEffect(() => {
    props.navigation.navigate('Search', { searchType: query });
    resetQuery();
  }, [query]);

  // Set query to an empty string to reset the query.
  function resetQuery() {
    setQuery('');
  }

  // Renders all the available search chips , and display the results when a search chip is pressed on.
  return (
    <>
      <View style={styles.chipContainer}>
        <View style={styles.chipView}>
          <Chip
            icon="bike"
            mode="outlined"
            style={{ backgroundColor: '#FF968A' }}
            onPress={() => setQuery('Cycling')}
          >
            Cycling
          </Chip>
        </View>
        <View style={styles.chipView}>
          <Chip
            icon="swim"
            mode="outlined"
            style={{ backgroundColor: '#97C1a9' }}
            onPress={() => setQuery('Swimming')}
          >
            Swimming
          </Chip>
        </View>
        <View style={styles.chipView}>
          <Chip
            icon="run"
            mode="outlined"
            style={{ backgroundColor: '#ffffb5' }}
            selectedColor="black"
            onPress={() => setQuery('Running')}
          >
            Running
          </Chip>
        </View>
        <View style={styles.chipView}>
          <Chip
            icon="dumbbell"
            mode="outlined"
            style={{ backgroundColor: '#ABDEE6' }}
            onPress={() => setQuery('Weightlifting')}
          >
            Weightlifting
          </Chip>
        </View>
        <View style={styles.chipView}>
          <Chip
            icon="yoga"
            mode="outlined"
            style={{ backgroundColor: '#AAC5E2' }}
            onPress={() => setQuery('Yoga')}
          >
            Yoga
          </Chip>
        </View>
        <View style={styles.chipView}>
          <Chip
            icon="walk"
            mode="outlined"
            style={{ backgroundColor: '#C2778B' }}
            onPress={() => setQuery('Aerobics')}
          >
            Aerobics
          </Chip>
        </View>
        <View style={styles.chipView}>
          <Chip
            icon="run-fast"
            mode="outlined"
            style={{ backgroundColor: '#6891C3' }}
            onPress={() => setQuery('Cardio')}
          >
            Cardio
          </Chip>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  chipView: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 45,
  },
});

export default SearchChips;

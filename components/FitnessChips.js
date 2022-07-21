import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import GetChallenges from './GetChallenges';

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

  // A hook that is used to display results based on changes to the query state
  useEffect(() => {
    <DisplayResults />;
  }, [query]);

  // A component that renders the results
  const DisplayResults = () => {
    return (
      <View style={styles.results}>
        {query == '' ? null : (
          <GetChallenges navigation={props.navigation} searchType={query} />
        )}
      </View>
    );
  };

  // Renders all the available search chips , and display the results when a search chip is pressed on.
  return (
    <>
      <View style={styles.chipContainer}>
        <View style={styles.chip}>
          <Chip
            icon="bike"
            mode="outlined"
            style={{ backgroundColor: '#FF968A' }}
            onPress={() => setQuery('Cycling')}
          >
            Cycling
          </Chip>
        </View>
        <View style={styles.chip}>
          <Chip
            icon="swim"
            mode="outlined"
            style={{ backgroundColor: '#97C1a9' }}
            onPress={() => setQuery('Swimming')}
          >
            Swimming
          </Chip>
        </View>
        <View style={styles.chip}>
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
        <View style={styles.chip}>
          <Chip
            icon="dumbbell"
            mode="outlined"
            style={{ backgroundColor: '#ABDEE6' }}
            onPress={() => setQuery('Weightlifting')}
          >
            Weightlifting
          </Chip>
        </View>
        <View style={styles.chip}>
          <Chip
            icon="yoga"
            mode="outlined"
            style={{ backgroundColor: '#AAC5E2' }}
            onPress={() => setQuery('Yoga')}
          >
            Yoga
          </Chip>
        </View>
        <View style={styles.chip}>
          <Chip
            icon="walk"
            mode="outlined"
            style={{ backgroundColor: '#C2778B' }}
            onPress={() => setQuery('Aerobics')}
          >
            Aerobics
          </Chip>
        </View>
        <View style={styles.chip}>
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
      <DisplayResults />
    </>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  results: {
    flex: 1,
  },
  chip: {
    // width: 120,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default SearchChips;

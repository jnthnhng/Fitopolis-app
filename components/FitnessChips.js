import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { Chip } from 'react-native-paper';
import GetChallenges from './SearchFunction';

const SearchChips = () => {
  const [query, setQuery] = useState('');
  console.log(query);
  // console.log(typeof query)
  console.log(query == '');

  return (
    <>
      <View style={styles.chipContainer}>
        <View style={styles.chip}>
          <Chip
            icon="bike"
            mode="outlined"
            style={{ backgroundColor: '#FF968A' }}
            // onPress={setTheQuery('Cycling')}
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
      <View style={styles.results}>
        {query == '' ? null : <GetChallenges searchType={query} />}
      </View>
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

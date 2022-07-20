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
  // console.log(query);
  // console.log(typeof query)

  return (
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
          // onPress={<GetChallenges searchType="Swimming" />}
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
          // onPress={() => setQuery('Running')}
        >
          Running
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="dumbbell"
          mode="outlined"
          style={{ backgroundColor: '#ABDEE6' }}
          // onPress={<GetChallenges searchType="Weightlifting" />}
        >
          Weightlifting
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="yoga"
          mode="outlined"
          style={{ backgroundColor: '#AAC5E2' }}
          // onPress={<GetChallenges searchType="Yoga" />}
        >
          Yoga
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="walk"
          mode="outlined"
          style={{ backgroundColor: '#C2778B' }}
          // onPress={<GetChallenges searchType="Aerobics" />}
        >
          Aerobics
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="run-fast"
          mode="outlined"
          style={{ backgroundColor: '#6891C3' }}
          // onPress={<GetChallenges searchType="Cardio" />}
        >
          Cardio
        </Chip>
      </View>
      <View>
        {/* <GetChallenges searchType={query} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  chip: {
    // width: 120,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default SearchChips;

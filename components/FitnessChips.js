import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { Chip } from 'react-native-paper';

const SearchChips = () => {
  return (
    <View style={styles.chipContainer}>
      <View style={styles.chip}>
        <Chip
          icon="bike"
          mode="outlined"
          style={{ backgroundColor: '#FF968A' }}
        >
          Cycling
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="swim"
          mode="outlined"
          style={{ backgroundColor: '#97C1a9' }}
        >
          Swimming
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip icon="run" mode="outlined" style={{ backgroundColor: '#ffffb5' }}>
          Running
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="dumbbell"
          mode="outlined"
          style={{ backgroundColor: '#ABDEE6' }}
        >
          Weightlifting
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="yoga"
          mode="outlined"
          style={{ backgroundColor: '#ABDEE6' }}
        >
          Yoga
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="walk"
          mode="outlined"
          style={{ backgroundColor: '#ABDEE6' }}
        >
          Aerobics
        </Chip>
      </View>
      <View style={styles.chip}>
        <Chip
          icon="run-fast"
          mode="outlined"
          style={{ backgroundColor: '#ABDEE6' }}
        >
          Cardio
        </Chip>
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

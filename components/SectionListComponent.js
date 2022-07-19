import React from 'react';
import { View, SectionList, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SectionListResults = ({ results }) => {
  //   console.log(results);

  const display = (data) => {
    return data.map((item) => {
      console.log(item.challengeName, item.description);
      return {
        // <View key={item.key} style={{margin: 10}}>
        //   <Text>{item.challengeName}</Text>
        //   <Text>{item.challengeType}</Text>
        //   <Text>{item.description}</Text>
        // </View>

        title: item.challengeType,
        data: [item.challengeName, item.description],
      };
    });
  };
  return (
    <View style={styles.resultsBoxContainer}>
      <SectionList
        sections={display(results)}
        //   {
        //     title: 'Swimming',
        //     data: ['25m', '50m', '100m', '200m', '500m'],
        //   },

        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.item} onPress={() => alert('Clicked')}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
    </View>
  );
};

export default SectionListResults;

const styles = StyleSheet.create({
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
  item: {
    padding: 10,
    fontSize: 12,
    height: 35,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
});

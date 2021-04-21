import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

const TaskItem = (props) => {

  // const data = useState(["do", "did,", "to be done"])

  return (
    <View style={styles.container}>
      <View style={styles.alignLeft}>
        <View style={styles.tapElement}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.cross}>✕</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingBottom: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 3,
    shadowColor: "#0000ff",
    shadowOffset: {
        width: 2,
        height: -20,
    },
    shadowOpacity: 0.01,
    shadowRadius: 5.46,
  },

  alignLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  tapElement: {
    width: 28,
    height: 28, 
    borderWidth:  2,
    borderRadius: 5,
    marginRight: 15,
  },

  itemText: {
    maxWidth: '70%',
  },

  cross: {
      paddingLeft: 16,
      fontWeight: 'bold'
  },
});

export default TaskItem;
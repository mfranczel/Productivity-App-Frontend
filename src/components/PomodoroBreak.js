import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

const PomodoroBreak = (props) => {

  return (
    <View>
      <View>
        <Button>UP</Button>
        <Text>{props.text}</Text>
        <Button>DOWN</Button>
      </View>
      <View></View>
    </View>
  )
}

export default PomodoroBreak;
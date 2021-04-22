import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"

import PomodoroBreak from '../components/PomodoroBreak'
import PomodoroMain from '../components/PomodoroMain'

const Timer = ({ navigation }) => {

    const defaultSessionLength = 25
    const defaultSBreakLength = 5
    const defaultSessionCount = 1

    var mainPomodoro = defaultSessionLength
    var breakPomodoro = defaultSBreakLength
    var sessionPomodoro = defaultSessionCount

    

    return (
        <View style={styles.container}>
            <PomodoroMain text={mainPomodoro}/>
            <PomodoroBreak text={breakPomodoro}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 220,
      height: "100%"
    }
})

export default Timer
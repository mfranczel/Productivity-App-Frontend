import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, ScrollView } from "react-native"
import HabitItem from '../components/HabitItem'

const Habit = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.days}>
                <TouchableOpacity style={styles.daySelected}><Text style={{color:"#FF5B5B"}}>M</Text></TouchableOpacity>
                <TouchableOpacity style={styles.day} ><Text style={{color:"#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity style={styles.day}><Text style={{color:"#FF5B5B"}}>W</Text></TouchableOpacity>
                <TouchableOpacity style={styles.day}><Text style={{color:"#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity style={styles.day}><Text style={{color:"#FF5B5B"}}>F</Text></TouchableOpacity>
                <TouchableOpacity style={styles.day}><Text style={{color:"#FF5B5B"}}>S</Text></TouchableOpacity>
                <TouchableOpacity style={styles.day}><Text style={{color:"#FF5B5B"}}>S</Text></TouchableOpacity>
            </View>
            <ScrollView>
                <HabitItem />
                <HabitItem />
                <HabitItem />
                <HabitItem />
                <HabitItem />
                <HabitItem />
                <HabitItem />
                <HabitItem />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 50,
      height: "100%",
    },
    days: {
        flexDirection: "row",
        width: "85%",
        height: 50,
        justifyContent: "space-between",
    },
    day: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
    },
    daySelected: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#FF5B5B",
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Habit
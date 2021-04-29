import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup'
import { useDispatch } from 'react-redux'
import {addHabit} from '../slices/habitSlice'
const buttons = ['Daily', 'Weekly', 'Monthly']

const NewHabit = ({ navigation }) => {

    const [selectedIndex, updateIndex] = useState(1)
    const [weekDays, setWeekDays] = useState((new Array(7)).fill(0))
    const [numOfDays, setNumOfDays] = useState(0)
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()

    const setWeekDay = (index) => {
        var temp = [...weekDays]
        if (temp[index] === 0) {
            temp[index] = 1
        } else {
            temp[index] = 0
        }
        setWeekDays([...temp])
    }

    const sendHabit = () => {
        

        var habit = {text: title}
        if (selectedIndex === 0) {
            habit.type = "daily"
            habit.days = null
        } else if (selectedIndex === 1) {
            habit.type = "weekly"
            var days = []
            for (var i = 0; i < 7; i++) {
                if (weekDays[i] === 1) {
                    days.push(i)
                }
            }
            habit.days = days
            console.log(weekDays)
            console.log(days)
        } else {
            habit.type = "monthly"
            habit.days = numOfDays
        }
        dispatch(addHabit(habit))
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View>
            <Text style={{fontSize: 31, marginBottom: 20, marginLeft: 10}}>Add new habit</Text>
            <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>Title:</Text>
            <TextInput placeholder="New habit" style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
            <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>Goal:</Text>
            <ButtonGroup containerStyle={{width: "85%", marginTop: 0}} selectedButtonStyle={{backgroundColor: "#959595"}} borderColor={"#959595"} innerBorderStyle={{color: "#959595"}} textStyle={{color: "#959595"}} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
            {selectedIndex === 0 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat every day)</Text>}
            {selectedIndex === 1 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>Select days:</Text>}
            {selectedIndex === 2 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>Times per month:</Text>}
            {(selectedIndex === 1) && (<View style={styles.days}>
                <TouchableOpacity onPress={() => setWeekDay(0)} style={weekDays[0] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[0] === 1 ? "white" : "#FF5B5B"}}>S</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(1)} style={weekDays[1] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[1] === 1 ? "white" : "#FF5B5B"}}>M</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(2)} style={weekDays[2] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[2] === 1 ? "white" : "#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(3)} style={weekDays[3] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[3] === 1 ? "white" : "#FF5B5B"}}>W</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(4)} style={weekDays[4] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[4] === 1 ? "white" : "#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(5)} style={weekDays[5] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[5] === 1 ? "white" : "#FF5B5B"}}>F</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(6)} style={weekDays[6] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[6] === 1 ? "white" : "#FF5B5B"}}>S</Text></TouchableOpacity>
            </View>)}
            {(selectedIndex === 2) && <TextInput style={styles.input} value={numOfDays} onChangeText={(t) => setNumOfDays(t)} />}
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={() => sendHabit()}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: '#fff',
      height: "100%",
      paddingTop: 100,
      paddingLeft: 20
    },
    input: {
        height: 40,
        width: "85%",
        margin: 10,
        marginTop: 0,
        borderWidth: 1,
        paddingLeft: 12
    },
    days: {
        flexDirection: "row",
        width: "85%",
        marginLeft: 10,
        marginTop: 10,
        height: 50,
        justifyContent: "space-between",
    },
    day: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#FF5B5B",
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    daySelected: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#B7DDA9",
        backgroundColor: "#B7DDA9",
        color: "white",
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    saveButton: {
        borderWidth: 1,
        borderColor: "#ff5b5b",
        backgroundColor: "white",
        color: "black",
        width: "85%",
        margin: 10,
        height: 40,
        marginBottom: "70%",
        alignItems: "center"
    },
    saveText: {
        marginTop: "auto",
        marginBottom: "auto",
        color: "#ff5b5b",
        margin: 5
    },
})

export default NewHabit
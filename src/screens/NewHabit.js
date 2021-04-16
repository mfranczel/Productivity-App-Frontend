import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup'

const buttons = ['Daily', 'Weekly', 'Monthly']

const NewHabit = ({ navigation }) => {

    const [selectedIndex, updateIndex] = useState(1)
    const [weekDays, setWeekDays] = useState((new Array(7)).fill(0))
    const [numOfDays, setNumOfDays] = useState(0)
    const [title, setTitle] = useState("")

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
        
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 31, marginBottom: 20, marginLeft: 10}}>Add new habit</Text>
            <TextInput placeholder="Title" style={styles.input} />
            <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}>Goal</Text>
            <ButtonGroup containerStyle={{width: "85%"}} selectedButtonStyle={{backgroundColor: "#959595"}} borderColor={"#959595"} innerBorderStyle={{color: "#959595"}} textStyle={{color: "#959595"}} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
            {selectedIndex === 0 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}>Repeat every</Text>}
            {selectedIndex === 1 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}>Times per week</Text>}
            {selectedIndex === 2 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}>Times per month</Text>}
            {(selectedIndex === 0) && (<View style={styles.days}>
                <TouchableOpacity onPress={() => setWeekDay(0)} style={weekDays[0] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[0] === 1 ? "white" : "#FF5B5B"}}>M</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(1)} style={weekDays[1] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[1] === 1 ? "white" : "#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(2)} style={weekDays[2] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[2] === 1 ? "white" : "#FF5B5B"}}>W</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(3)} style={weekDays[3] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[3] === 1 ? "white" : "#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(4)} style={weekDays[4] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[4] === 1 ? "white" : "#FF5B5B"}}>F</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(5)} style={weekDays[5] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[5] === 1 ? "white" : "#FF5B5B"}}>S</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setWeekDay(6)} style={weekDays[6] === 1 ? styles.daySelected : styles.day}><Text style={{color: weekDays[6] === 1 ? "white" : "#FF5B5B"}}>S</Text></TouchableOpacity>
            </View>)}
            {(selectedIndex === 1) && (<View style={styles.days}>
                <TouchableOpacity onPress={() =>setNumOfDays(1)} style={ numOfDays === 1 ? styles.daySelected : styles.day}><Text style={{color: numOfDays === 1 ? "white" : "#FF5B5B"}}>1</Text></TouchableOpacity>
                <TouchableOpacity onPress={() =>setNumOfDays(2)} style={ numOfDays === 2 ? styles.daySelected : styles.day}><Text style={{color: numOfDays === 2 ? "white" : "#FF5B5B"}}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() =>setNumOfDays(3)} style={ numOfDays === 3 ? styles.daySelected : styles.day}><Text style={{color: numOfDays === 3 ? "white" : "#FF5B5B"}}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() =>setNumOfDays(4)} style={ numOfDays === 4 ? styles.daySelected : styles.day}><Text style={{color: numOfDays === 4 ? "white" : "#FF5B5B"}}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={() =>setNumOfDays(5)} style={ numOfDays === 5 ? styles.daySelected : styles.day}><Text style={{color: numOfDays === 5 ? "white" : "#FF5B5B"}}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={() =>setNumOfDays(6)} style={ numOfDays === 6 ? styles.daySelected : styles.day}><Text style={{color: numOfDays === 6 ? "white" : "#FF5B5B"}}>6</Text></TouchableOpacity>
                <TouchableOpacity onPress={() =>setNumOfDays(7)} style={ numOfDays === 7 ? styles.daySelected : styles.day}><Text style={{color: numOfDays === 7 ? "white" : "#FF5B5B"}}>7</Text></TouchableOpacity>
            </View>)}
            {(selectedIndex === 2) && <TextInput style={styles.input} value={numOfDays} onChangeText={(t) => setNumOfDays(t)} />}

            <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: '#fff',
      height: "100%",
      paddingTop: 100,
      paddingLeft: 20
    },
    input: {
        height: 40,
        width: "85%",
        margin: 10,
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
        marginTop: "40%",
        margin: 10,
        height: 40,
        marginBottom: 15,
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
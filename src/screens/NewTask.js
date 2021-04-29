import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import { ButtonGroup } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import {addTask} from '../slices/taskSlice'
const buttons = ['Daily', 'Weekly', 'Monthly']

const NewTask = ({ navigation }) => {

    const [selectedIndex, updateIndex] = useState(1)
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()

    const sendTask = () => {
        if (title === ""){
            return
        }

        var task = {text: title}
        if (selectedIndex === 0) {
            task.type = "daily"
        } else if (selectedIndex === 1) {
            task.type = "weekly"
        } else {
            task.type = "monthly"
        }
        console.log(task)
        dispatch(addTask(task))

        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}> 
            <View style={styles.wrapperwidth}> 
            <Text style={{fontSize: 31, marginBottom: 20, marginLeft: 10}}>Add new task</Text>
            <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>Title:</Text>
            <TextInput placeholder="New task" style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
            <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>Type:</Text>

            <ButtonGroup containerStyle={{width: "85%", marginTop: 0}} selectedButtonStyle={{backgroundColor: "#959595"}} borderColor={"#959595"} innerBorderStyle={{color: "#959595"}} textStyle={{color: "#959595"}} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
            {selectedIndex === 0 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat every day)</Text>}
            {selectedIndex === 1 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Reapeat once a week)</Text>}
            {selectedIndex === 2 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat once a month)</Text>}
            <TouchableOpacity style={styles.saveButton} onPress={() => sendTask()}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            </View> 
            </View> 
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
      paddingLeft: 20,
    },

    wrapper: {
        alignItems: "center"
    },

    wrapperwidth: {
        width:270
    },
    input: {
        height: 40,
        width: "85%",
        margin: 10,
        marginTop: 0,
        borderWidth: 1,
        paddingLeft: 12
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

export default NewTask
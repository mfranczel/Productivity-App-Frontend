import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { ButtonGroup } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import {addTask} from '../slices/taskSlice'
const buttons = ['Daily', 'Weekly', 'Monthly']


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stats = ({ navigation }) => {

    const [selectedIndex, updateIndex] = useState(1)

    return (
        <View style={styles.container}>
            <ScrollView style={styles.taskWrapper} >
                <View style={styles.taskWrapper}>
                    <Text style={styles.sectionTodoTitle}>Stats: not-done/doing/done</Text>
                    <View style={styles.tasksItem}>
                        Data here ....
                    </View>
                </View>

                <ButtonGroup containerStyle={{width: "85%", marginTop: 0}} selectedButtonStyle={{backgroundColor: "#FF5B5B"}} borderColor={"#fff"} innerBorderStyle={{color: "#fff"}} textStyle={{color: "#959595"}} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
                {selectedIndex === 0 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat every day)</Text>}
                {selectedIndex === 1 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Reapeat once a week)</Text>}
                {selectedIndex === 2 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat once a month)</Text>}

                <TouchableOpacity style={styles.stats} onPress={() => {navigation.navigate("Tabs")}}>
                    <Text style={styles.statsText}>Back</Text>
                </TouchableOpacity>
                
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
    sectionTodoTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center',
    },
    tasksItem: {
        marginTop: 20
    },
    tasksWrapper: {
        alignItems: 'center',
    },
    stats: {
        borderWidth: 1,
        backgroundColor: "#FF5B5B",
        color: "white",
        borderColor: "white",
        width: 260,
        margin: 10,
        height: 40,
        marginBottom: 8,
        alignItems: "center",
    },
    statsText: {
        marginTop: "auto",
        marginBottom: "auto",
        margin: 5,
        fontWeight: "bold",
        color: "white",
    },
})

export default Stats


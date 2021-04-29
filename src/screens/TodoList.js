import React, {useEffect, useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, ScrollView, FlatList } from "react-native"
import TaskItem from '../components/TaskItem'

import { ButtonGroup } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
const buttons = ['Daily', 'Weekly', 'Monthly']

import { getTasks } from '../slices/taskSlice'

import Profile from '../screens/Profile';


const TodoList = ({ navigation }) => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.tasks)
    const loading = useSelector(state => state.tasks.loading)
    const [title, setTitle] = useState("")
    const [selectedIndex, updateIndex] = useState(1)

    const [currDate, setCurrDate] = useState((new Date()).getDay())



    useEffect(() => {
        dispatch(getTasks())
    }, [])

    useEffect(() => {
        dispatch(getTasks(selectedIndex))
    }, [selectedIndex])

    useEffect(() => {
        setCurrDate(currDate)
    })

    const renderItem = ({item} ) => (
        <TaskItem task={item}  text={item}/>
    );
    
    const onStats = () => {

    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <ButtonGroup containerStyle={{width: "85%", marginTop: 0}} selectedButtonStyle={{backgroundColor: "#FF5B5B"}} borderColor={"#fff"} innerBorderStyle={{color: "#fff"}} textStyle={{color: "#959595"}} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
            {selectedIndex === 0 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat every day)</Text>}
            {selectedIndex === 1 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Reapeat once a week)</Text>}
            {selectedIndex === 2 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat once a month)</Text>}

            <TouchableOpacity style={styles.stats} onPress={() => {navigation.navigate("Stats")}}>
                    <Text style={styles.statsText}>Stats</Text>
            </TouchableOpacity>

                <Text style={styles.sectionTodoTitle}>To Do</Text>
                <View style={styles.taskWrapper}>
                    <View style={styles.tasksItem}>
                    <FlatList
                        style={{width: "100%", height: "100%"}}
                        data={tasks.filter(task => task.task_state.state === 0)}
                        onRefresh={() => dispatch(getTasks(selectedIndex))}
                        renderItem={renderItem}
                        refreshing={loading}
                        extraData={loading}
                        keyExtractor={task => task.id + ""}/>
                    </View>
                </View>
                <Text style={styles.sectionTodoTitle}>Doing</Text>
                <View style={styles.taskWrapper}>
                    <View style={styles.tasksItem}>
                        <FlatList
                            style={{width: "100%", height: "100%"}}
                            data={tasks.filter(task => task.task_state.state === 1)}
                            onRefresh={() => dispatch(getTasks(selectedIndex))}
                            renderItem={renderItem}
                            refreshing={loading}
                            extraData={loading}
                            keyExtractor={task => task.id + ""}/>
                    </View>
                </View>
                <Text style={styles.sectionTodoTitle}>Done</Text>
                <View style={styles.taskWrapper}>
                    <View style={styles.tasksItem}>
                        <FlatList
                            style={{width: "100%", height: "100%"}}
                            data={tasks.filter(task => task.task_state.state === 2)}
                            onRefresh={() => dispatch(getTasks(selectedIndex))}
                            renderItem={renderItem}
                            refreshing={loading}
                            extraData={loading}
                            keyExtractor={task => task.id + ""}/>
                    </View>
                </View>
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
        width:270
    },
    tasksItem: {
        marginTop: 20,
        width:260
    },
    stats: {
        borderWidth: 1,
        backgroundColor: "white",
        color: "black",
        width: 270,
        margin: 10,
        height: 40,
        marginBottom: 8,
        alignItems: 'center',
    },
    statsText: {
        marginTop: "auto",
        marginBottom: "auto",
        margin: 5,
        fontWeight: "bold"
    },
})

export default TodoList
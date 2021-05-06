import React, {useEffect, useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, ScrollView, FlatList } from "react-native"
import TaskItem from '../components/TaskItem'

import { ButtonGroup } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
const buttons = ['Daily', 'Weekly', 'Monthly']

import { getTasks, getTasksDaily, getTasksWeekly, getTasksMonthly } from '../slices/taskSlice'

import Profile from '../screens/Profile';
import color from 'color'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'


const TodoList = ({ navigation }) => {
    const dispatch = useDispatch()
    const dailyTasks = useSelector(state => state.tasks.tasksDaily)
    const weeklyTasks = useSelector(state => state.tasks.tasksWeekly)
    const monthlyTasks = useSelector(state => state.tasks.tasksMonthly)


    const loading = useSelector(state => state.tasks.loading)
    const [selectedIndex, updateIndex] = useState(1)

    const [currDate, setCurrDate] = useState((new Date()).getDay())



    useEffect(() => {
        dispatch(getTasksDaily())
        dispatch(getTasksWeekly())
        dispatch(getTasksMonthly())
    }, [])

    useEffect(() => {
        if (selectedIndex === 0) {
            dispatch(getTasksDaily())
        } else if (selectedIndex === 1) {
            dispatch(getTasksWeekly())
        } else {
            dispatch(getTasksMonthly())
        }
    }, [selectedIndex])

    useEffect(() => {
        setCurrDate(currDate)
    })

    const renderItem = ({item} ) => (
        <TaskItem task={item}  text={item}/>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "flex-start"}}>
                <ButtonGroup containerStyle={{width: 220, marginTop: 0, height: 42, marginRight: 5}} selectedButtonStyle={{backgroundColor: "#FF5B5B"}} borderColor={"#fff"} innerBorderStyle={{color: "#fff"}} textStyle={{color: "#959595"}} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
                <TouchableOpacity style={styles.stats} onPress={() => {navigation.navigate("Stats")}}>
                    <FontAwesomeIcon style={styles.statsText} size={20} icon={faChartPie} />
                </TouchableOpacity>
            </View>
            {selectedIndex === 0 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat every day)</Text>}
            {selectedIndex === 1 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Reapeat once a week)</Text>}
            {selectedIndex === 2 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat once a month)</Text>}

                <Text style={styles.sectionTodoTitle}>To Do</Text>
                <View style={styles.taskWrapper}>
                    <View style={styles.tasksItem}>
                    <FlatList
                        style={{width: "100%", height: "auto"}}
                        data={selectedIndex === 0 
                            ? dailyTasks.filter(task => task.task_state.state === 0)
                            : selectedIndex === 1 
                            ? weeklyTasks.filter(task => task.task_state.state === 0)
                            : monthlyTasks.filter(task => task.task_state.state === 0)}
                        onRefresh={() => selectedIndex === 0 
                            ? dispatch(getTasksDaily())
                            : selectedIndex === 1 
                            ? dispatch(getTasksWeekly())
                            : dispatch(getTasksMonthly())}
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
                            style={{width: "100%", height: "auto"}}
                            data={selectedIndex === 0 
                                ? dailyTasks.filter(task => task.task_state.state === 1)
                                : selectedIndex === 1 
                                ? weeklyTasks.filter(task => task.task_state.state === 1)
                                : monthlyTasks.filter(task => task.task_state.state === 1)}
                            onRefresh={() => selectedIndex === 0 
                                ? dispatch(getTasksDaily())
                                : selectedIndex === 1 
                                ? dispatch(getTasksWeekly())
                                : dispatch(getTasksMonthly())}
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
                            style={{width: "100%", height: "auto"}}
                            data={selectedIndex === 0 
                                ? dailyTasks.filter(task => task.task_state.state === 2)
                                : selectedIndex === 1 
                                ? weeklyTasks.filter(task => task.task_state.state === 2)
                                : monthlyTasks.filter(task => task.task_state.state === 2)}
                            onRefresh={() => selectedIndex === 0 
                                ? dispatch(getTasksDaily())
                                : selectedIndex === 1 
                                ? dispatch(getTasksWeekly())
                                : dispatch(getTasksMonthly())}
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
        marginLeft: 10,
        width: 270
    },
    tasksItem: {
        marginTop: 20,
        width: 270
    },
    stats: {
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "#FF5B5B",
        color: "#FF5B5B",
        borderRadius: 3,
        width: 70,
        height: 42,
        alignItems: 'center',
    },
    statsText: {
        marginTop: "auto",
        marginBottom: "auto",
        color: "#FF5B5B",
        margin: 5,
    },
})

export default TodoList
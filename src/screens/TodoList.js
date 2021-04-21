import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, ScrollView } from "react-native"
import TaskItem from '../components/TaskItem'

const TodoList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.taskWrapper}>
                    <Text style={styles.sectionTodoTitle}>To Do</Text>
                    <View style={styles.tasksItem}>
                        <TaskItem text={'eat pizza'}/>
                        <TaskItem text={'water plant'}/>
                        <TaskItem text={'plant a tree'}/>
                        <TaskItem text={'get drunk'}/>
                        <TaskItem text={'eat pizza'}/>
                        <TaskItem text={'water plant'}/>
                        <TaskItem text={'plant a tree'}/>
                        <TaskItem text={'water plant'}/>
                        <TaskItem text={'water plant'}/>
                        <TaskItem text={'plant a tree'}/>
                    </View>
                </View>
                <View style={styles.taskWrapper}>
                    <Text style={styles.sectionTodoTitle}>Doing</Text>
                    <View style={styles.tasksItem}>
                        {/* tasks doing */}
                    </View>
                </View>
                <View style={styles.taskWrapper}>
                    <Text style={styles.sectionTodoTitle}>Done</Text>
                    <View style={styles.tasksItem}>
                        {/* tasks done*/}
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
    },
    tasksItem: {
        marginTop: 20
    }
})

export default TodoList
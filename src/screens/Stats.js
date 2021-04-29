import React, {useState, useEffect} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { ButtonGroup } from 'react-native-elements'
import { useDispatch, useSelector} from 'react-redux'
import {addTask} from '../slices/taskSlice'
const buttons = ['Daily', 'Weekly', 'Monthly']


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getStats } from '../slices/statsSlice'

import { PieChart} from "react-native-chart-kit";
import { Dimensions } from 'react-native'


const Tab = createBottomTabNavigator();

const Stats = ({ navigation }) => {


    const dispatch = useDispatch()
    const stats = useSelector(state => state.stats.stats)
    const loading = useSelector(state => state.stats.loading)
    const [title, setTitle] = useState("")
    const [selectedIndex, updateIndex] = useState(1)

    const [currDate, setCurrDate] = useState((new Date()).getDay())


    const data = [
        {
          name: "Not done",
          population: stats[0],
          color: "red",
          legendFontSize: 16
        },
        {
          name: "Doing",
          population: stats[1],
          color: "green",
          legendFontSize: 16
        },
        {
          name: "Done",
          population: stats[2],
          color: "blue",
          legendFontSize: 16
        },
      ];

    useEffect(() => {
        dispatch(getStats(selectedIndex))
        console.log(stats)
    }, [selectedIndex])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.taskWrapper}>
                <View style={styles.wrapper}>
                    <Text style={styles.sectionTodoTitle}>Stats: not-done/doing/done</Text>
                

                    <PieChart
                        data={data}
                        width={270}
                        height={160}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: { borderRadius: 1}}
                        }
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[8, 8]}
                        absolute
                    />


                <ButtonGroup containerStyle={{width: "270", marginTop: 0}} selectedButtonStyle={{backgroundColor: "#FF5B5B"}} borderColor={"#fff"} innerBorderStyle={{color: "#fff"}} textStyle={{color: "#959595"}} alignItems= {"center"} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
                {selectedIndex === 0 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat every day)</Text>}
                {selectedIndex === 1 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Reapeat once a week)</Text>}
                {selectedIndex === 2 && <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 2}}>(Repeat once a month)</Text>}

                <TouchableOpacity style={styles.stats} onPress={() => {navigation.navigate("Tabs")}}>
                    <Text style={styles.statsText}>Back</Text>
                </TouchableOpacity>
                </View></View>
                
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
      padding: 16,
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

    wrapper: {
        width: 270,
    },
    stats: {
        borderWidth: 1,
        backgroundColor: "#FF5B5B",
        color: "white",
        borderColor: "white",
        width: 270,
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


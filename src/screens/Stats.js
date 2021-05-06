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
                <View style={styles.wrapper}>
                    <Text style={styles.sectionTodoTitle}>Stats: not-done/doing/done</Text>

                    <View style={{height: 250}}>
                        { stats[0] > 0 || stats[1] > 0 || stats[2] > 0 ? 
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
                        /> :  <Text style={{marginTop: "auto", marginBottom: "auto", color: "grey", width: 270, textAlign: "center"}}>Keine Statistiken zu sehen.</Text>
                        }
                    </View>
                    


                    <ButtonGroup containerStyle={{width: 270, margin: 0}} selectedButtonStyle={{backgroundColor: "#FF5B5B"}} borderColor={"#fff"} innerBorderStyle={{color: "#fff"}} textStyle={{color: "#959595"}} alignItems= {"center"} buttons={buttons} theme={{colors:[]}} selectedIndex={selectedIndex} onPress={updateIndex}/>
                    {selectedIndex === 0 && <Text style={{marginTop: 10, marginBottom: 2, width: 270, textAlign: "center"}}>(Repeat every day)</Text>}
                    {selectedIndex === 1 && <Text style={{marginTop: 10, marginBottom: 2, width: 270, textAlign: "center"}}>(Reapeat once a week)</Text>}
                    {selectedIndex === 2 && <Text style={{marginTop: 10, marginBottom: 2, width: 270, textAlign: "center"}}>(Repeat once a month)</Text>}

                    <TouchableOpacity style={styles.stats} onPress={() => {navigation.navigate("Tabs")}}>
                        <Text style={styles.statsText}>Back</Text>
                    </TouchableOpacity>
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
      paddingTop: 100,
      height: "100%",
    },
    sectionTodoTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center"
    },
    tasksItem: {
        marginTop: 20
    },
    tasksWrapper: {
        alignItems: 'center',
    },

    wrapper: {
        width: 270,
        alignItems: "center"
    },
    stats: {
        borderWidth: 1,
        backgroundColor: "#FF5B5B",
        color: "white",
        borderColor: "white",
        width: 270,
        marginTop: 10,
        height: 40,
        marginBottom: 8,
        alignItems: "center",
    },
    statsText: {
        marginTop: "auto",
        marginBottom: "auto",
        fontWeight: "bold",
        color: "white",
    },
})

export default Stats


import React, {useEffect, useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import HabitItem from '../components/HabitItem'
import { getHabits } from '../slices/habitSlice'

const Habit = ({ navigation }) => {

    const dispatch = useDispatch()
    const habits = useSelector(state => state.habits.habits)
    const [currDate, setCurrDate] = useState((new Date()).getDay())
    const loading = useSelector(state => state.habits.loading)

    useEffect(() => {
        dispatch(getHabits())
    }, [])

    useEffect(() => {
        setCurrDate(currDate)
    })

    const renderItem = ({item} ) => (
        <HabitItem habit={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.days}>
                <TouchableOpacity style={currDate === 0 ? styles.daySelected : styles.day}><Text style={{color:"#FF5B5B"}}>S</Text></TouchableOpacity>
                <TouchableOpacity style={currDate === 1 ? styles.daySelected : styles.day}><Text style={{color:"#FF5B5B"}}>M</Text></TouchableOpacity>
                <TouchableOpacity style={currDate === 2 ? styles.daySelected : styles.day}><Text style={{color:"#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity style={currDate === 3 ? styles.daySelected : styles.day}><Text style={{color:"#FF5B5B"}}>W</Text></TouchableOpacity>
                <TouchableOpacity style={currDate === 4 ? styles.daySelected : styles.day}><Text style={{color:"#FF5B5B"}}>T</Text></TouchableOpacity>
                <TouchableOpacity style={currDate === 5 ? styles.daySelected : styles.day}><Text style={{color:"#FF5B5B"}}>F</Text></TouchableOpacity>
                <TouchableOpacity style={currDate === 6 ? styles.daySelected : styles.day}><Text style={{color:"#FF5B5B"}}>S</Text></TouchableOpacity>
            </View>
            {/*<ScrollView style={{width: "100%"}}>
                {
                    habits.map(habit => <HabitItem habit={habit}/>)
                }
            </ScrollView>*/}
            { habits.length != 0 ?
            <FlatList
                style={{width: "100%", height: "100%"}}
                data={habits}
                onRefresh={() => dispatch(getHabits())}
                renderItem={renderItem}
                refreshing={loading}
                extraData={loading}
                keyExtractor={habit => habit.id + ""}
            /> : <Text style={{marginTop: "auto", marginBottom: "auto", color: "grey"}}>Keine Gewohnheiten zu sehen.</Text>}
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
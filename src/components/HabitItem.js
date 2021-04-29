import React, { useEffect, useState, useRef} from 'react'
import { Animated, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { removeHabit, completeHabit } from '../slices/habitSlice'

const HabitItem = ({habit}) => {
    
    const [data, setData] = useState([0,0,0,0,0,0,0])
    const [dayNames, setDayNames] = useState(['M','T','W','T','F','S','S'])
    const dispatch = useDispatch()
    const swipeableRef = useRef(null);

    useEffect(() => {
        var curr = new Date()
        var firstDayOfWeek = new Date(curr.setDate(curr.getDate() - curr.getDay()))
        var lastDayOfWeek = new Date(curr.setDate(firstDayOfWeek + 6))

        curr = new Date()

        if (habit.type === "daily") {
            var days = [0,0,0,0,0,0,0]
            var weeklyDays = habit.habit_day_dones.filter(dd => new Date(dd.date) > firstDayOfWeek).map(dd => new Date(dd.date))
            weeklyDays.forEach(d => days[d.getDay()-1] = 1)
            for (var i = 0; i < curr.getDay(); i++) {
                if (days[i] != 1) {
                    days[i] = -1
                }
            }
            setData([...days])
        } else if (habit.type === "weekly") {
            var days = [0,0,0,0,0,0,0]
            var weeklyDays = habit.habit_day_dones.filter(dd => new Date(dd.date) > firstDayOfWeek).map(dd => new Date(dd.date))
            weeklyDays.forEach(d => days[d.getDay()-1] = 1)
            habit.habit_weekday_tbds.forEach((wd) => days[wd.day-1] === 0 ? days[wd.day-1] = -1 : days[wd.day-1] = 1)
            setData([...days])
        } else {

        }

    }, [habit])

    const rightAction = (progress, dragX) => {
        return (
            <View style={{backgroundColor: "#B7DDA9", height: 130, width: "30%", marginLeft: -8}}>
                <TouchableOpacity onPress={() => {dispatch(completeHabit(habit.id)); swipeableRef.current.close()}} style={{flexDirection: "column", justifyContent: "center", height: "100%", width: "100%", alignItems: "flex-end"}}>
                    <Animated.Text style={[
                        {
                        height: 20,
                        color: "white",
                        marginRight: "15%",
                        },
                    ]}>
                        Complete
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }

    const leftAction = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
          });
        return (
            <View style={{backgroundColor: "#FF5B5B", height: 130, width: "30%", marginRight: -8}}>
                <TouchableOpacity onPress={() => {dispatch(removeHabit(habit.id)); swipeableRef.current.close()}} style={{flexDirection: "column", justifyContent: "center", height: "100%", width: "100%"}}>
                    <Animated.Text style={[
                        {
                        //transform: [{ translateX: trans }],
                        height: 20,
                        marginLeft: "15%",
                        color: "white"
                        },
                    ]}>
                        Delete
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <Swipeable 
            overshootLeft={false} 
            overshootRight={false} 
            renderLeftActions={leftAction} 
            onSwipeableLeftOpen={() => {}}
            renderRightActions={rightAction} 
            onSwipeableLeftOpen={() => {}}
            ref={swipeableRef}>
            <View elevation={3} style={style.container}>
                    <Text style={{color: "#FF5B5B", fontSize: 20}}>{habit.text}</Text>
                    <Text style={{color: "#6A6868", fontSize: 11}}>Streak: 20 days</Text>
                    <View style={style.days}>
                        {   
                                dayNames.map((d, i) => (
                                <TouchableOpacity key={i} style={data[i] === 0 ? style.day : data[i] === 1 ? style.dayDone : style.dayNotDone}>
                                    <Text style={{color: data[i] === 0 ? "#FF5B5B": "white"}}>
                                        {d}
                                    </Text>
                                </TouchableOpacity>)
                            )
                        }
                    </View>
            </View>
        </Swipeable>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 130,
        padding:15,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        borderRadius: 3,
        shadowColor: "#0000ff",
        shadowOffset: {
            width: 2,
            height: -20,
        },
        shadowOpacity: 0.01,
        shadowRadius: 5.46,
    },
    days: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 20
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
    dayDone: {
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
    dayNotDone: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#FF5B5B",
        backgroundColor: "#FF5B5B",
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    rowBack: {
        alignItems: 'center',
        //backgroundColor: 'red',
        zIndex: -1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
    },
})

export default HabitItem
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Animated } from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

const HabitItem = () => {
    
    const data = useState([1,2,3,4,5,6])

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                setListData(newData);
                animationIsRunning.current = false;
            });
        }
    };


    const renderHiddenItem = () => (
        <View style={style.rowBack}>
            <View style={[style.backRightBtn, style.backRightBtnRight]}>
                <Text style={style.backTextWhite}>Delete</Text>
            </View>
        </View>
    );

    return (
        <View elevation={2} style={style.container}>
                <Text style={{color: "#FF5B5B", fontSize: 20}}>Talking to plants</Text>
                <Text style={{color: "#6A6868", fontSize: 11}}>Streak: 20 days</Text>
                <View style={style.days}>
                    <TouchableOpacity style={style.dayDone}><Text style={{color:"white"}}>M</Text></TouchableOpacity>
                    <TouchableOpacity style={style.dayNotDone}><Text style={{color:"white"}}>T</Text></TouchableOpacity>
                    <TouchableOpacity style={style.day}><Text style={{color:"#FF5B5B"}}>W</Text></TouchableOpacity>
                    <TouchableOpacity style={style.day}><Text style={{color:"#FF5B5B"}}>T</Text></TouchableOpacity>
                    <TouchableOpacity style={style.day}><Text style={{color:"#FF5B5B"}}>F</Text></TouchableOpacity>
                    <TouchableOpacity style={style.day}><Text style={{color:"#FF5B5B"}}>S</Text></TouchableOpacity>
                    <TouchableOpacity style={style.day}><Text style={{color:"#FF5B5B"}}>S</Text></TouchableOpacity>
                </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        zIndex: 2,
        width: "95%",
        height: 130,
        padding:15,
        marginLeft: "auto",
        marginRight: "auto",
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
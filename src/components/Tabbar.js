import { faClock, faInfinity, faPlus, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';

const Tabbar = ({ state, descriptors, navigation }) => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

     useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true)
        })
        Keyboard.addListener( 'keyboardDidHide',() => {
            setKeyboardVisible(false)
        })
    }, [])

    const getIcon = (index) => {
        if (index === 0) {
            return faTasks
        } else if (index === 1) {
            return faInfinity
        } else if (index === 2) {
            return faPlus
        } else if (index === 3) {
            return faClock
        } else if (index === 4) {
            return faUser
        }
    }

    const getWidth = (index) => {
        if (index === 1) {
            return "30%"
        } else if (index ===3) {
            return "30%"
        } else {
            return "20%"
        }
    }

    return (
            <View style={[styles.bar, {display: isKeyboardVisible ? "none" : "flex"}]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                    };

                    const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={index !== 2 ? {width: getWidth(index), justifyContent: "center",
                            alignItems: "center"} : [styles.roundButton, {display: isKeyboardVisible ? "none" : "flex"}]}
                            key={index}>

                            <FontAwesomeIcon style={{color: "white"}} icon={getIcon(index)} size={ 32 }  />
                                    
                        </TouchableOpacity>)
                        
                    
                })}    
            </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        height: 50,
        width: "100%",
        backgroundColor: "#FF5B5B",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        color: "white",
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
    },
    roundButton: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: "white",
        backgroundColor: "#FF5B5B",
        borderWidth: 3,
        position: "absolute",
        bottom: 20,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Tabbar
import { faClock, faInfinity, faPlus, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tabbar = ({ state, descriptors, navigation }) => {

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
        <View style={styles.bar}>
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
                    <>
                    { index !== 2 ? 
                            <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityState={isFocused ? { selected: true } : {}}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    onLongPress={onLongPress}
                                    style={styles.button}
                                    style={{width: getWidth(index), justifyContent: "center",
                                    alignItems: "center",}}
                                >
                                <FontAwesomeIcon style={{color: "white"}} icon={getIcon(index)} size={ 32 }  />
                                
                            </TouchableOpacity>:
                            <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityState={isFocused ? { selected: true } : {}}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    onLongPress={onLongPress}
                                    style={styles.roundButton}
                                >
                                <FontAwesomeIcon style={{color: "white"}} icon={getIcon(index)} size={ 32 }  /> 
                            </TouchableOpacity>
                    }
                    </>
                )
            })}    
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        height: 60,
        width: "100%",
        backgroundColor: "#FF5B5B",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        color: "white",
        width: "25%",
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
        bottom: 30,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Tabbar
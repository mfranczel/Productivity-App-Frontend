import NewHabit from "./NewHabit"
import NewTask from "./NewTask"
import {useNavigationState} from '@react-navigation/native';
import React from 'react'
import { useEffect } from "react";

const New = ({ navigation, tab }) => {

    const prevScreen = useNavigationState(state => state.history[state.history.length-2]?.key.split('-')[0] ? state.history[state.history.length-2]?.key.split('-')[0] : 'None')

    return(
        <>
            {
                prevScreen === "Habits"
                ? <NewHabit navigation={navigation}/>
                : <NewTask navigation={navigation}/>
            }
        </>
    )
}

export default New
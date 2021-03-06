import React from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile, setToken } from "./slices/userSlice"
import Login from './screens/Login'
import Register from './screens/Register'
import Stats from './screens/Stats'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
const Stack = createStackNavigator()

const Home = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        if (isAuth) {
            dispatch(getProfile())
        }
        if (Platform.OS !== 'web') {
            SecureStore.getItemAsync('token')
                .then((res) => {
                    if (res) {
                        dispatch(setToken(res))
                    }
                })
        } else {
            var token = localStorage.getItem('token')
            if (token) {
                dispatch(setToken(token))
            }
        }
    
    }, [])
    

    return (
        <NavigationContainer>
            <Stack.Navigator name="Home" screenOptions={{headerShown: false}}>
                {
                    (isAuth || token) ? (
                        <>
                        <Stack.Screen name="Tabs" component={Tabs} />
                        <Stack.Screen name="Stats" component={Stats} />
                        </>

                    ) : (
                        <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Home
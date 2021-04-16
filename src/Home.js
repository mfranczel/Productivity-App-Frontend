import React from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "./slices/userSlice"
import Login from './screens/Login'
import Register from './screens/Register'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';

const Stack = createStackNavigator()

const Home = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    })
    

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {
                    isAuth ? (
                        <Stack.Screen name="Tabs" component={Tabs} />
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
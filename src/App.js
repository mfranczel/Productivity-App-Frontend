import React from 'react';
import { Provider} from 'react-redux'
import getStore from './store'
import Login from './screens/Login'
import Register from './screens/Register'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Habit from './screens/Habits';
import {AppRegistry} from 'react-native';
import {registerRootComponent} from 'expo'
const { store } = getStore()

const Stack = createStackNavigator()

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Habit" component={Habit} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App)

export default App

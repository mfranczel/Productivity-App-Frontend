import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Tabbar from '../components/Tabbar';
import Habits from '../screens/Habits'
import NewHabit from '../screens/NewHabit';
import Profile from '../screens/Profile';
import Timer from '../screens/Timer';
import TodoList from '../screens/TodoList';
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <Tabbar {...props}/>} tabBarOptions={{keyboardHidesTabBar: true}}>
      <Tab.Screen name="TodoList" component={TodoList} />
      <Tab.Screen name="Habits" component={Habits} />
      <Tab.Screen name="NewHabit" component={NewHabit} />
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default MyTabs
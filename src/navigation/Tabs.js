import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Tabbar from '../components/Tabbar';
import Habits from '../screens/Habits'
import Profile from '../screens/Profile';
import Timer from '../screens/Timer';
import TodoList from '../screens/TodoList';
import New from '../screens/New';
import NewHabit from '../screens/NewHabit';
import NewTask from '../screens/NewTask';
import {useNavigationState} from '@react-navigation/native';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

const MyTabs = () => {


  return (
    <Tab.Navigator tabBar={(props) => <Tabbar {...props}/>} tabBarOptions={{keyboardHidesTabBar: true}}>
      <Tab.Screen options={{unmountOnBlur: true}} name="TodoList" component={TodoList} />
      <Tab.Screen options={{unmountOnBlur: true}} name="Habits" component={Habits} />
      <Tab.Screen options={{unmountOnBlur: true}} name="New" component={New} />
      <Tab.Screen options={{unmountOnBlur: true}} name="Timer" component={Timer} />
      <Tab.Screen options={{unmountOnBlur: true}} name="Profile" component={Profile} />      
    </Tab.Navigator>
  );
}

export default MyTabs
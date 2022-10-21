import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SheduleStack from '../NavigationStacks/ScheduleStack';
import Entypo from 'react-native-vector-icons/Feather';
import WebsiteStack from '../NavigationStacks/WebsiteStack';
import ReservationStack from '../NavigationStacks/ReservationStack';
import TimeTableStack from '../NavigationStacks/TimeTableStack';
import AttendanceStack from '../NavigationStacks/AttendanceStack';
  
const Tab = createBottomTabNavigator();

const BottomView = () => {
  return ( 
    <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:'#fff'}}} tabBarOptions={{activeTintColor:'green',inactiveTintColor:'#000f'}} >
        <Tab.Screen
           component={SheduleStack} 
           name="Dashboard"
           options={{
              tabBarIcon:({color}) => (
                 <Entypo name="home" color={color} size={24} />
                //  <Image style={{width:30,height:30,tintColor:color}} source={require('../assets/Fleets-Icon.png')}/>
                 ),
             }}
           screenOptions={{}}
        />
        <Tab.Screen
           component={WebsiteStack} 
           name="NLearn"
           options={{
              tabBarIcon:({color}) => (
                 <Entypo name="book" color={color} size={24} />
                //  <Image style={{width:30,height:30,tintColor:color}} source={require('../assets/Load-icon.png')}/>
                 ),
             }} 
        />
        <Tab.Screen
           component={ReservationStack} 
           name="Reservation"
           options={{
              tabBarIcon:({color}) => (
                 <Entypo name="list" color={color} size={24} />
                //  <Image style={{width:25,height:25,tintColor:color}} source={require('../assets/Live-Tracking-Icon.png')}/>
                 ),
             }} 
        />
        <Tab.Screen
           component={TimeTableStack} 
           name="TimeTable"
           options={{
              tabBarIcon:({color}) => (
                 <Entypo name="calendar" color={color} size={24} />
                //  <Image style={{width:25,height:25,tintColor:color}} source={require('../assets/Profile-Icon.png')}/>
                 ),
             }} 
        />
        <Tab.Screen
           component={AttendanceStack} 
           name="Attendance"
           options={{
              tabBarIcon:({color}) => (
                 <Entypo name="archive" color={color} size={24} />
                //  <Image style={{width:25,height:25,tintColor:color}} source={require('../assets/Profile-Icon.png')}/>
                 ),
             }} 
        />
    </Tab.Navigator>
 )
}

export default BottomView
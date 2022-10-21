import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import WebsiteView from '../../Screens/WebsiteView';
import ProfileScreen from '../../Screens/ProfileScreen';
import DailyShedule from '../../Screens/DailySchedule';
import DailySchedule from '../../Screens/DailySchedule';

 
const Stack = createStackNavigator();

const SheduleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={() => ({ title: 'Daily Schedule', headerTitleStyle: { fontSize: 20,color:'black', fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#fff', shadowColor: '#253f9e',shadowOffset:{height:0,} }, headerBackTitle: false })}
        name="Schedule"
        component={DailySchedule}
      />
      <Stack.Screen
        options={() => ({ title: 'Profile', headerTitleStyle: { fontSize: 20,color:'black', fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#e2e8f5', shadowColor: '#253f9e',shadowOffset:{height:0,} }, headerBackTitle: false })}
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  )
}

export default SheduleStack
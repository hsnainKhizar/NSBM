import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TimeTableScreen from '../../Screens/TimeTableScreen';
import TimeSheduleScreen from '../../Screens/TimeSheduleScreen';

const Stack = createStackNavigator();

const TimeTableStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={() => ({ title: 'Calendar', headerTitleStyle: { fontSize: 20,color:'black', fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#fff', shadowColor: '#253f9e',shadowOffset:{height:0,} }, headerBackTitle: false })}
        name="Calendar"
        component={TimeTableScreen}
      />
      <Stack.Screen
        options={() => ({ title: 'Time Table', headerTitleStyle: { fontSize: 20,color:'black', fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#dfe2eb', shadowColor: '#253f9e',shadowOffset:{height:0,} }, headerBackTitle: false })}
        name="TimeTable"
        component={TimeSheduleScreen}
      />
    </Stack.Navigator>
  )
}

export default TimeTableStack
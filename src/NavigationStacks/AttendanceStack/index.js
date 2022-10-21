import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ReservationScreen from '../../Screens/ReservationScreen';
import AttendanceScreen from '../../Screens/AttendanceScreen';
 

const Stack = createStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={() => ({ title: 'Attendance', headerTitleStyle: { fontSize: 20,color:'black', fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#fff', shadowColor: '#253f9e',shadowOffset:{height:0,} }, headerBackTitle: false })}
        name="Attendance"
        component={AttendanceScreen}
      />
    </Stack.Navigator>
  )
}

export default AttendanceStack
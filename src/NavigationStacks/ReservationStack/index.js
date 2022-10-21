import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ReservationScreen from '../../Screens/ReservationScreen';


const Stack = createStackNavigator();

const ReservationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={() => ({ title: 'Reservation', headerTitleStyle: { fontSize: 20,color:'black', fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#fff', shadowColor: '#253f9e',shadowOffset:{height:0,} }, headerBackTitle: false })}
        name="ReserveRoom"
        component={ReservationScreen}
      />
    </Stack.Navigator>
  )
}

export default ReservationStack
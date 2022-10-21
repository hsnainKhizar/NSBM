import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import WebsiteView from '../../Screens/WebsiteView';

const Stack = createStackNavigator();
 
const WebsiteStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerLeft: ()=> (<View style={{paddingLeft:20}}><Text style={{fontSize:30,color:'green',fontWeight:"bold"}}>NLearn</Text></View>)}}>
      <Stack.Screen
        options={() => ({ title: '', headerTitleStyle: { fontSize: 20,color:'black', fontWeight: 'bold' }, headerTintColor: 'white', headerStyle: { backgroundColor: '#fff', shadowColor: '#253f9e',shadowOffset:{height:0,} }, headerBackTitle: false })}
        name="WebsiteView"
        component={WebsiteView}
      />
    </Stack.Navigator>
  )
}

export default WebsiteStack
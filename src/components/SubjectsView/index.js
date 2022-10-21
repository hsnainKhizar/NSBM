import { View, Text } from 'react-native'
import React from 'react'

const SubjectsView = (props) => {

  console.log(props.item.sub_name)
  return (
    <View style={{ flexDirection: 'column',marginHorizontal:14,marginVertical:10, paddingLeft: 40, paddingRight: 40, borderRadius: 16, backgroundColor: `${props.item.color}`, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 10 }}>{props.item.sub_name}</Text>
      <Text style={{ fontSize: 10 }}>{props.item.date}</Text>
      <Text style={{ fontSize: 10 }}>{props.item.time}</Text>
    </View>
  )
}

export default SubjectsView
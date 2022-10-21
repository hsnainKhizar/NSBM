import { View, TextStyleSheet, SafeAreaView, Image,StyleSheet,Text } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Button} from 'react-native-paper'
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const TimeTableScreen = () => {
  const [date,setDate] = useState()
  const [month,setMonth] = useState()

  const minDate = new Date(2021,10,26); // Today
    const maxDate = new Date(2022, 1, 21);

  const navigation = useNavigation();


  const setCurrentDate = (date) => {
   // date = setDate(new Date())
    //date = minDate
    setMonth(moment(date).format("MMMM"))
    setDate( moment(date).format("MM-DD-YYYY"))
    //navigation.navigate("TimeTable")
   // console.log(month)
  }
  const checkTimeTable = ()=>{

    
    //const month = moment(date).format("MMMM")
    const time = {date,month}
   // console.log("month",month)
    navigation.navigate("TimeTable",time)

  } 
  return (
    <>
      <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} colors={['#253f9e', '#253f9e']} style={styles.background}>
        <SafeAreaView style={styles.background}>
          <View style={{ flexDirection: 'column', backgroundColor: '#fff', padding: 15 }}>

            


            {/* <Image style={{width:140,height:100}} source={require('../../assets/sosLogo.png')}/> */}
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={{ flex: 1, backgroundColor: '#eaf3ec' }} >

        <View style={styles.container}>
        <CalendarPicker
        minDate={minDate}
        //maxDate={maxDate}
          onDateChange={setCurrentDate}
        />
        {/* <Text>{date}</Text> */}

       
        </View>
        <Button uppercase={false} mode="contained" onPress={checkTimeTable} labelStyle={{ color: 'black', fontSize: 16 }} style={styles.loginButton2}>Check Time Table</Button>
        

      </View>
    </>
  )
}
 
export default TimeTableScreen

const styles = StyleSheet.create({
  background: {
    // flex: 0.15,
    // borderBottomRightRadius: 30,
    //borderBottomLeftRadius: 30,
    // backgroundColor:"#253f9e",
  },
  container: {
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eaf3ec',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop:20,
    //position:'absolute',
    //left:30,
    //right:30,
    //top:120,
    //bottom:100,
    //borderRadius:10,
    padding: 10,
    //paddingTop:100,
  },
  loginButton: {
    alignSelf: 'center',
    width: '80%',
    borderRadius:20,
    backgroundColor: '#dce0df',
    // color:'white',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    padding: 2,
    //top: 20,
},
loginButton2: {
  alignSelf: 'center',
  width: '80%',
  borderRadius:20,
  backgroundColor: '#dce0df',
  // color:'white',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOpacity: 0.8,
  elevation: 6,
  padding: 2,
  top: 10,
},
loginButton3: {
  alignSelf: 'center',
  width: '50%',
  borderRadius:20,
  backgroundColor: '#66b01c',
  // color:'white',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOpacity: 0.8,
  elevation: 6,
  padding: 2,
  marginTop: 60,
},
})
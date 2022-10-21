import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'react-native-paper'
import MapViewDirections from 'react-native-maps-directions';
import { getCurrentLocation, locationPermission } from '../../components/Helper/HelperFunction'



const AttendanceScreen = () => {

  let todayDate = new Date().toLocaleString()


  const firstRangeAttendanceLatitude = 6.8201735
  const firstRangeattendancelongitude = 80.0396406

  const secondRangeAttendanceLatitude = 6.8201735
  const secondRangeattendancelongitude = 80.0396406

  const [canMarkAttendance, setMarkAttendance] = useState(false)

  const markAttendance = () => {
    Alert.alert("Attendance Marked")
  }

 
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission()

    if (locPermissionDenied) {
      const { latitude, longitude } = await getCurrentLocation()
      console.log("New latitude", latitude, "Longitude", longitude)

      if (latitude >= firstRangeAttendanceLatitude && latitude <= secondRangeAttendanceLatitude) {
        console.log("in class ")
        setMarkAttendance(true)
      }

    }
  }

  useEffect(() => {
    getLiveLocation()
  })


  return (
    <>
      <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} colors={['#fff', '#fff']} style={styles.background}>
        <SafeAreaView style={styles.background}>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
            {/* <Image style={{width:140,height:100}} source={require('../../assets/sosLogo.png')}/> */}
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={{ flex: 1, padding: 25 }}>
            <View style={{ flexDirection: 'column', marginTop: 15, justifyContent: 'space-around', backgroundColor: '#E2E8F5', borderRadius: 10, padding: 20, paddingBottom: 30, justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ padding: 10, fontSize: 20 }}>{todayDate}</Text>
              {/* <Button uppercase={false} mode="contained" onPress={() => { }} labelStyle={{ color: 'black', fontSize: 16 }} style={styles.loginButton}>Select Date</Button> */}
              {/* <Button uppercase={false} mode="contained"  labelStyle={{ color: 'black', fontSize: 16 }} style={styles.loginButton2}>Select Time Period</Button> */}
            </View>

            <View style={{ flex: 1,justifyContent:'center'}}>
              <View style={{ flexDirection: 'column', marginTop: 15, justifyContent: 'space-around', backgroundColor: '#E2E8F5', borderRadius: 10, padding: 20, paddingBottom: 30, justifyContent: 'center', alignItems: 'center' }}>

                {canMarkAttendance === true ? 
                  <View>
                    <Text style={{ padding: 10, fontSize: 17 }}>Mark Your Attendance</Text>
                <Button uppercase={false} mode="contained" onPress={() => { markAttendance() }} labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton3}>Mark Attendance</Button>
                  </View>  
                  :<Text>Sorry, You are not in the class!</Text>
              }
                
              </View>
            </View>
          </View>


        </View>
      </View>
    </>
  )
}

export default AttendanceScreen

const styles = StyleSheet.create({
  background: {
    //  flex: 0.15,
    // borderBottomRightRadius: 30,
    //borderBottomLeftRadius: 30,
    // backgroundColor:"#253f9e",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eaf3ec',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    //position:'absolute',
    //left:30,
    //right:30,
    //top:120,
    //bottom:100,
    //borderRadius:10,
    // padding:10,
    //paddingTop:100,
  },
  loginButton2: {
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20,
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
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#66b01c',
    // color:'white',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    padding: 2,
    marginTop: 60,
  },
})
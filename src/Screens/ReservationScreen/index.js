import { View, Text, StyleSheet, SafeAreaView, Image, Modal, Pressable, Alert, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper'
import database from '@react-native-firebase/database';
import { AuthContext } from '../../../AuthProvider';
//import { Button } from '../../../../SOSApp/node_modules/react-native-paper/lib/typescript';
 
const ReservationScreen = () => {

  let todayDate = new Date().toLocaleString()

  const [depNumber, setDepNumber] = useState(0)
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(0)
  const [selectedDepNumber, setSelectedDepNumber] = useState(0)
  const [bookedRoomStatus, setBookedRoomStatus] = useState()


  const [roomNumber, setRoomNumber] = useState()
  const [bookingStatus, setBookingStatus] = useState(false)
  const [showCancelButton, setShowCancelButton] = useState(false)

  const { user, logout } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [showRooms, setShowRooms] = useState(false);

  //const []


  const bookRoom1 = () => {

    console.log("Dep No", depNumber)
    let choosedRoomNumber = 1
    console.log("Room NUmber: 1",)
    setShowRooms(!showRooms)

    //check if room is free

    database()
      .ref(`Departments/Dep${depNumber}/room1`)
      .once('value')
      .then(snapshot => {

        if (snapshot.val().reserved == "no") {

          fetchUserRoomDetail(snapshot.val().room_no, choosedRoomNumber, depNumber)


        } else {
          console.log("dep", depNumber)
          Alert.alert('Room is already Booked')
        }

        //console.log('User data: ', snapshot.val());
      });



    setDepNumber(0)
  }

  const fetchUserRoomDetail = (room_no, choosedRoomNumber, depNum) => {
    console.log("room free")

    database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then(snapshot => {

        setBookedRoomStatus(snapshot.val().booked_room)
        console.log('iam here 2')
        if (snapshot.val().booked_room == "no") {
          console.log("room not taken")

          updateUserBooking(room_no, choosedRoomNumber, depNum)

        } else {
          Alert.alert('You have already booked an room.')
        }

      });


  }

  const updateUserBooking = (room_no, choosedRoomNumber, depNum) => {
    database()
      .ref(`users/${user.uid}`)
      .update({
        booked_room: "yes",
        booked_room_no: room_no,
        selected_room: choosedRoomNumber,
        dep_no: depNum,
      })
      .then(() => {
        console.log('user Data updated.')
        updateRoomBooking(choosedRoomNumber,depNum)
      }

      );
  }
  const updateRoomBooking = (choosedRoomNumber,depNum) => {
    database()
      .ref(`Departments/Dep${depNum}/room${choosedRoomNumber}`)
      .update({
        reserved: "yes",
        user_id: user.uid,
      })
      .then(() => console.log('Data updated.'));

    Alert.alert('Room Booked')

    setDepNumber(0);
  }
  const bookRoom2 = () => {

    console.log("Dep No", depNumber)
    let choosedRoomNumber = 2
    console.log("Room NUmber 2")
    setShowRooms(!showRooms)

    database()
      .ref(`Departments/Dep${depNumber}/room2`)
      .once('value')
      .then(snapshot => {

        if (snapshot.val().reserved == "no") {

          fetchUserRoomDetail(snapshot.val().room_no, choosedRoomNumber, depNumber)


        } else {

          Alert.alert('Room is already Booked')
        }

        //console.log('User data: ', snapshot.val());
      });



    //setDepNumber(0)


  }
  const bookRoom3 = () => {

    console.log("Dep No", depNumber)
    console.log("Room NUmber 3")
    let choosedRoomNumber = 3
    setShowRooms(!showRooms)

    database()
      .ref(`Departments/Dep${depNumber}/room3`)
      .once('value')
      .then(snapshot => {

        if (snapshot.val().reserved == "no") {

          fetchUserRoomDetail(snapshot.val().room_no, choosedRoomNumber, depNumber)


        } else {

          Alert.alert('Room is already Booked')
        }

        //console.log('User data: ', snapshot.val());
      });



    setDepNumber(0)

  }

  const department1 = () => {
    setModalVisible(!modalVisible)
    setShowRooms(true)
    setDepNumber(1)

    // Alert.alert('book dep 1')
  }

  const department2 = () => {
    setModalVisible(!modalVisible)
    setShowRooms(true)
    setDepNumber(2)

    //Alert.alert('book dep 2')
  }

  const department3 = () => {
    setModalVisible(!modalVisible)
    setShowRooms(true)
    setDepNumber(3)

    //Alert.alert('book dep 3')
  }

  const getRoomDetail = () => {


    database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then(snapshot => {
        //setUserEmail(snapshot.val().email)
        // setRoomStatus(snapshot.val().reserved)
        setRoomNumber(snapshot.val().booked_room_no)
        setSelectedRoomNumber(snapshot.val().selected_room)
        setSelectedDepNumber(snapshot.val().dep_no)
        if (snapshot.val().booked_room == "yes") {
          setShowCancelButton(true)
        }
        //console.log(snapshot.val().booked_room)
        //console.log(snapshot)
        //console.log('user detail: ', snapshot.val());
      });

    if (roomNumber !== null) {
      setBookingStatus(true)
    }

    //setBookingStatus(true)

  }

  const cancelUserBooking = () => {
    database()
      .ref(`users/${user.uid}`)
      .update({
        booked_room: "no",
        booked_room_no: "No Booking",
        selected_room: 0,
        dep_no: 0,
      })
      .then(() => {
        setShowCancelButton(false)
        //updateRoomBooking(choosedRoomNumber)
      }

      );
  }

  const cancelBooking = () => {
    console.log("bookem room", selectedRoomNumber, "dep", selectedDepNumber)

    database()
      .ref(`Departments/Dep${selectedDepNumber}/room${selectedRoomNumber}`)
      .update({
        reserved: "no",
        user_id: user.uid,
      })
      .then(() =>
        cancelUserBooking()
      );

    Alert.alert('Booking Cancelled')
  }

  useEffect(() => {
    getRoomDetail()
  })
  return (
    <>
      <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} colors={['#253f9e', '#253f9e']} style={styles.background}>
        <SafeAreaView style={styles.background}>
          <View style={{ flexDirection: 'column', backgroundColor: '#fff', padding: 15 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Book</Text>
              {/* <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/userLoog.jpeg')} /> */}
            </View>

            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Study Room</Text>

            <View style={{ flexDirection: 'column', marginTop: 15, justifyContent: 'space-around', backgroundColor: '#eaf3ec', borderRadius: 10, padding: 20, paddingBottom: 30, justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ padding: 10, fontSize: 17 }}>{todayDate}</Text>
              {/* <Button uppercase={false} mode="contained" onPress={() => { }} labelStyle={{ color: 'black', fontSize: 16 }} style={styles.loginButton}>Select Date</Button> */}
              <Button uppercase={false} mode="contained" onPress={() => { setModalVisible(true) }} labelStyle={{ color: 'black', fontSize: 16 }} style={styles.loginButton2}>Select Faculty</Button>
            </View>


            {/* <Image style={{width:140,height:100}} source={require('../../assets/sosLogo.png')}/> */}
          </View>

        </SafeAreaView>
      </LinearGradient>

      <View style={{ flex: 1, backgroundColor: '#fff' }} >

        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15, paddingTop: 20 }} >

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TextInput style={{ width: '100%', height: 50, borderRadius: 10, backgroundColor: 'lightgrey', padding: 10 }} placeholder={"Starting time"} />

                  </View> */}
                  {/* <View style={{ flexDirection: 'row', width: '100%', marginTop: 16 }}>
                    <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} />
                  </View> */}

                  <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={department1} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>SOB</Button>
                    {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={department2} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>SOC</Button>
                    {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={department3} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>SOE</Button>
                    {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                  </View>

                  {/* <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable> */}
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showRooms}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setShowRooms(!showRooms);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TextInput style={{ width: '100%', height: 50, borderRadius: 10, backgroundColor: 'lightgrey', padding: 10 }} placeholder={"Starting time"} />

                  </View> */}
                  {/* <View style={{ flexDirection: 'row', width: '100%', marginTop: 16 }}>
                    <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} />
                  </View> */}

                  <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={bookRoom1} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Room 1</Button>
                    {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={bookRoom2} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Room 2</Button>
                    {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={bookRoom3} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Room 3</Button>
                    {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                  </View>

                  {/* <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable> */}
                </View>
              </View>
            </Modal>
            {bookingStatus === false ? <Text style={{ fontSize: 30, color: '#464375', fontWeight: 'bold' }}>Not Booked Any Room Yet</Text> : <Text style={{ fontSize: 70, color: '#464375', fontWeight: 'bold' }}>{roomNumber}</Text>}

            {showCancelButton === true && (<Button uppercase={false} mode="contained" onPress={() => { cancelBooking() }} labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton3}>Cancel Booking</Button>)}
          </View>
        </View>

      </View>
    </>
  )
}

export default ReservationScreen

const styles = StyleSheet.create({
  background: {
    // flex: 0.15,
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
    marginTop: 20,
    //position:'absolute',
    //left:30,
    //right:30,
    //top:120,
    //bottom:100,
    //borderRadius:10,
    padding: 10,
    //paddingTop:100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    padding: 15,
  },
  modalView: {
    margin: 20,

    width: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  loginButton: {
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20,
    backgroundColor: 'green',
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
    width: '50%',
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
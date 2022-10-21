import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, Modal,FlatList } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../../AuthProvider';

class Grades {
    sub1;
    sub2;
}

const ProfileScreen = (props) => {

    // const navigation = useNavigation();
    const { user, logout } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState()
    const [name, setUserName] = useState()
    const [courseTitle, setCourseTitle] = useState()
    const [studentID, setStudentID] = useState()
    const [bookedRoom, setBookedRoom] = useState()
    const [showSemesters, setShowSemesters] = useState(false)
    const [showGrades, setShowGrades] = useState(false)
    const [grades, setGrades] = useState([])

    //let grade = Grades;
    //let sub1 = ""
    //let sub2 = ""

    let percentag = 0.0;

    const [percentage, setPercentage] = useState(0.0)
    const [percent, setPercent] = useState()
    const [totalGrades,setTotalGrades] = useState(0)
    //const [totalPoints,setTotalPoints]
    // const {user,setUserEmail} = useState()


    const getUserInfo = () => {
        // console.log(user.uid)
        database()
            .ref(`users/${user.uid}`)
            .once('value')
            .then(snapshot => {
                setUserEmail(snapshot.val().email)
                setUserName(snapshot.val().name)
                setCourseTitle(snapshot.val().courseTitle)
                setStudentID(snapshot.val().student_id)
                setBookedRoom(snapshot.val().booked_room_no)
                console.log('User data: ', userEmail);
            });

        getCourseInfo()
    }

    const getCourseInfo = () => {
        database()
            .ref(`grades/${user.uid}`)
            .once('value')
            .then(snapshot => {



                let totalPointsSem1 = snapshot.val().sem1.total_points
                let earnedPointsSem1 = snapshot.val().sem1.earned_points

                let totalPointsSem2 = snapshot.val().sem2.total_points
                let earnedPointsSem2 = snapshot.val().sem2.earned_points

                let totalPointsSem3 = snapshot.val().sem3.total_points
                let earnedPointsSem3 = snapshot.val().sem3.earned_points

                let totalPointsSem4 = snapshot.val().sem4.total_points
                let earnedPointsSem4 = snapshot.val().sem4.earned_points

                let totalPoints = totalPointsSem1 + totalPointsSem2 + totalPointsSem3 + totalPointsSem4
                let totalEarnedPoints = earnedPointsSem1 + earnedPointsSem2 + earnedPointsSem3 + earnedPointsSem4

                //setUserEmail(snapshot.val().email)
                // console.log("Sem1",totalPointsSem1,earnedPointsSem1);
                // console.log("Sem2",totalPointsSem2,earnedPointsSem2);
                // console.log("totalPoints",totalPoints)
                // console.log("TotalEarnedPoints",totalEarnedPoints)

                percentag = totalEarnedPoints / 800
                setPercentage(percentag)
                setPercent(percentag * 100)

                console.log(percentag)

            });
    }

    const checkGrades = () => {
        setShowSemesters(true)
    }
 
    const calculateGrades = (semester) => {
        console.log(semester)
        database()
            .ref(`grades/${user.uid}/sem${semester}`)
            .once('value')
            .then(snapshot => {
               // grades = snapshot.val()
                setGrades(snapshot.val())
               // setTotalGrades(snapshot.numChildren() - 2)

                console.log('User data: ', grades);
            });
        setShowSemesters(false)
        setShowGrades(true)
    }



    useEffect(() => {
        getUserInfo()


    }, [])

    return (
        <>
            <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} colors={['#253f9e', '#253f9e']} style={styles.background}>
                <SafeAreaView style={styles.background}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f5', padding: 15 }}>
                        {/* <Text style={{ color: 'grey' }}>Hello Binara</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>You've got</Text> */}
                            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('../../assets/nsbmlogo.jpeg')} />

                        </View>
                        <Text style={{ color: 'black', marginTop: 10, fontSize: 25 }}>{name}</Text>


                        {/* <Image style={{width:140,height:100}} source={require('../../assets/sosLogo.png')}/> */}
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <View style={{ flex: 1, backgroundColor: '#e2e8f5' }} >

                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'column', padding: 15, paddingTop: 20 }} >

                        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Course</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Progress</Text>
                            <Text>{percent}%</Text>

                        </View>
                        <Progress.Bar height={25} borderRadius={8} color={'green'} style={{ marginTop: 20 }} progress={percentage} width={350} />



                        <View style={{ overflow: 'hidden', flexDirection: 'column', padding: 10, marginTop: 10 }}>

                            <View style={{ flexDirection: 'row', shadowColor: '#000', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'grey' }}>Degree :</Text>
                                <Text style={{ color: 'black' }}>{courseTitle}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', shadowColor: '#000', marginTop: 10 }}>
                                <Text style={{ color: 'grey', }}>Student ID :</Text>
                                <Text style={{ color: 'black' }}>{studentID}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', shadowColor: '#000', marginTop: 10 }}>
                                <Text style={{ color: 'grey' }}>Email :</Text>
                                <Text style={{ color: 'black' }}>{userEmail}</Text>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: 'grey' }}>Booked Room :</Text>
                                <Text style={{ color: 'black' }}>{bookedRoom}</Text>
                            </View>
                        </View>


                        <TouchableOpacity onPress={() => { checkGrades() }} style={{ justifyContent: 'flex-start', shadowColor: '#000', padding: 10, marginTop: 6 }}>
                            <Text style={{ color: 'black' }}>Check Grades <Icon name="arrow-right" size={17} /></Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { logout() }} style={{ justifyContent: 'flex-start', shadowColor: '#000', padding: 10 }}>
                            <Text style={{ color: 'black' }}>Logout <Icon name="arrow-right" size={17} /></Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showSemesters}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setShowRooms(!showRooms);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>


                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button onPress={() => { calculateGrades("1") }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Year 1</Button>
                                        {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                                    </View>

                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button onPress={() => { calculateGrades("2") }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Year 2</Button>
                                        {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                                    </View>

                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button onPress={() => { calculateGrades("3") }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Year 3</Button>
                                        {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                                    </View>

                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button onPress={() => { calculateGrades("4") }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Year 4</Button>
                                        {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                                    </View>

                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showGrades}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setShowRooms(!showRooms);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                    
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub1Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub1}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub2Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub2}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub3Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub3}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub4Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub4}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub5Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub5}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub6Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub6}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub7Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub7}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent:'space-between' }}>
                                        <Text style={{color:'black'}}>{grades.sub8Name}</Text>
                                        <Text style={{color:'black'}}>{grades.sub8}</Text>
                                        {/* <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>{grades.sub1}</Button> */}
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Semester 2</Button>
                                        <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} />
                                    </View> */}

                                    {/* <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Semester 3</Button>
                                        <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} />
                                    </View> */} 

                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button onPress={() => { setShowGrades(false) }} uppercase={false} mode="contained" labelStyle={{ color: 'white', fontSize: 16 }} style={styles.loginButton}>Done</Button>
                                        {/* <TextInput style={{ width: '100%', backgroundColor: 'lightgrey', padding: 10, height: 50, borderRadius: 10 }} placeholder={"Starting time"} /> */}
                                    </View>

                                </View>
                            </View>
                        </Modal>



                    </View>
                </View>

            </View>
        </>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    background: {
        // flex: 0.15,
        // borderBottomRightRadius: 30,
        //borderBottomLeftRadius: 30,
        // backgroundColor:"#253f9e",
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
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ededed',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        //position:'absolute',
        //left:30,
        //right:30,
        //top:120,
        //bottom:100,
        //borderRadius:10,
        padding: 10,
        //paddingTop:100,
    },
    // loginButton: {
    //     alignSelf: 'center',
    //     width: '80%',
    //     backgroundColor: '#253f9e',
    //     // color:'white',
    //     shadowColor: 'rgba(0, 0, 0, 0.1)',
    //     shadowOpacity: 0.8,
    //     elevation: 6,
    //     padding: 2,
    //     top: 20,
    // },
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
})
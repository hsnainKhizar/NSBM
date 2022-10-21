import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native'
import React, { Component, useEffect, useState,useContext, createContext } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
import { Button } from 'react-native-paper'
import SubjectsView from '../../components/SubjectsView';
import { AuthContext } from '../../../AuthProvider';
//import { Button } from '../../../../SOSApp/node_modules/react-native-paper/lib/typescript';



class TimeSheduleScreen extends Component {

    
   // static { user, logout } createContext(AuthContext);

   static contextType = AuthContext
    constructor(props) {
        super(props)
        this.state = {
            subject: [],
            //user: useContext(AuthContext)

        }
    }

    getTimeTable = () => {
        //console.log("i am here")
        console.log(this.props.route.params.date)
        console.log(this.props.route.params.month)



        database()
            .ref(`calendar/${this.context.user.uid}/${this.props.route.params.month}/${this.props.route.params.date}`)
            .once('value')
            .then(snapshot => {
                var items = [];
                snapshot.forEach((child) => {
                    items.push({
                        sub_name: child.val().sub_name,
                        time: child.val().time,
                        color: child.val().color,
                        date: child.val().date,
                    });
                });

                this.setState({ subject: items })

                console.log('time table: ', this.state.subject);
            });

    }
    componentDidMount() {
        this.getTimeTable()
    }

    render() {
        return (
            <>
                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} colors={['#253f9e', '#253f9e']} style={styles.background}>
                    <SafeAreaView style={styles.background}>
                        <View style={{ flexDirection: 'column', backgroundColor: '#dfe2eb', padding: 15 }}>
                            {/* <Image style={{width:140,height:100}} source={require('../../assets/sosLogo.png')}/> */}
                        </View>
                    </SafeAreaView>
                </LinearGradient>

                <View style={{ flex: 1, backgroundColor: '#dfe2eb' }} >

                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 15, paddingTop: 20 }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                                    <FlatList
                                        data={this.state.subject}
                                        renderItem={({ item }) => <SubjectsView item={item} />}
                                        showsVerticalScrollIndicator={false}
                                        //numColumns={2}

                                    />
                                </View>

                            </View>
                        </View>
                    </View>

                </View>
            </>
        )
    }

}

export default TimeSheduleScreen

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
        backgroundColor: '#fff',
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
    loginButton: {
        alignSelf: 'center',
        width: '80%',
        borderRadius: 20,
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
        backgroundColor: 'darkblue',
        // color:'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 2,
        marginTop: 60,
    },
})
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper'
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthProvider';


class DailySchedule extends Component {



  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      subject: [],
      todayDate: new Date().toLocaleString(),
      date: moment(new Date()).format("MM-DD-YYYY"),
      month: moment(new Date()).format("MMMM"),
      totalSubjects: 0,
      name: "",
      

    }
  }

  getCurrentDate = () => {



    console.log("Month", this.state.month)
    console.log("Date", this.state.date)

    database()
      .ref(`calendar/${this.context.user.uid}/${this.state.month}/${this.state.date}`)
      .once('value')
      .then(snapshot => {
        var items = [];
        this.setState({totalSubjects: snapshot.numChildren()})
        snapshot.forEach((child) => {
          this.setState({name: child.val().student_name})
          items.push({
            sub_name: child.val().sub_name,
            time: child.val().time,
            // color: child.val().color,
            // date: child.val().date,
          });
        });

        // setSubjects(items)
        this.setState({ subject: items })

        console.log('time table: ', this.state.subject);
      });
  }

  goToProfile = () => {
    console.log("i am here")
    //const navigation = useNavigation();
    this.props.navigation.navigate("Profile")
  }


  componentDidMount() {
    this.getCurrentDate()
  }

  render() {
    return (
      <>
        <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} colors={['#253f9e', '#253f9e']} style={styles.background}>
          <SafeAreaView style={styles.background}>
            <View style={{ flexDirection: 'column', backgroundColor: '#fff', padding: 15 }}>
              <Text style={{ color: 'grey' }}>Hello {this.state.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>You've got</Text>
                <TouchableOpacity onPress={this.goToProfile}><Image style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/nsbmlogo.jpeg')} /></TouchableOpacity>
              </View>

              <Text style={{ color: 'green', fontSize: 30, fontWeight: 'bold' }}>{this.state.totalSubjects} Lectures</Text>

              <Text style={{ fontSize: 17, marginTop: 15 }}>Modules</Text>
              <Text style={{ color: 'grey' }}>Your Running Subjects</Text>
              {/* <Image style={{width:140,height:100}} source={require('../../assets/sosLogo.png')}/> */}
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={{ flex: 1, backgroundColor: '#fff' }} >

          <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 15, paddingTop: 20 }} >

              <Text>Today's Schedule</Text>
              <Text style={{ marginTop: 10 }}>{this.state.todayDate}</Text>

              <FlatList
                data={this.state.subject}
                renderItem={({ item }) => <View style={{ flexDirection: 'column', backgroundColor: '#a7bfde', padding: 15, paddingRight: 60, paddingLeft: 60, borderRadius: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{item.sub_name}</Text>
                  <Text style={{marginTop:6}}>Time : {item.time}</Text>
                </View>}
                showsVerticalScrollIndicator={false}
                //numColumns={2}

              />

            </View>
          </View>

        </View>
      </>
    )
  }
}

export default DailySchedule

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
    backgroundColor: '#253f9e',
    // color:'white',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    padding: 2,
    top: 20,
  },
})
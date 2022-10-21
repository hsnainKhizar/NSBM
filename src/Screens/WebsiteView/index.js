import { View, Text,StyleSheet,SafeAreaView } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
   
const WebsiteView = () => {
  return ( 
    <>
    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} colors={['#253f9e', '#253f9e']} style={styles.background}>
        <SafeAreaView style={styles.background}>
          <View style={{ flexDirection: 'column', backgroundColor: '#e2e8f5'}}>

            


            {/* <Image style={{width:140,height:100}} source={require('../../assets/sosLogo.png')}/> */}
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={{ flex: 1, backgroundColor: '#e2e8f5' }} >

        <View style={styles.container}>

        <WebView
         source={{ uri: 'https://nlearn.nsbm.ac.lk/login/index.php' }}
         onLoad={console.log("load")}
         //style={{ marginTop: 20 }}
     
        />
        </View>

      </View>

      
    </>
    
  )
}

export default WebsiteView

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
   
   // marginTop:20,
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
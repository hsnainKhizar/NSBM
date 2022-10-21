import { View, Text,SafeAreaView,TextInput,StyleSheet, Alert,Image,KeyboardAvoidingView } from 'react-native'
import React,{useState,useContext} from 'react'

import {Button} from 'react-native-paper'
import { AuthContext } from '../../../AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';
  
const LoginScreen = () => {

  const [email,setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  const loginCheck = () => {
    login(email,password)
  }
  return (

    

    <KeyboardAvoidingView>
      <ScrollView>
    <View style={{flex:1,flexDirection:'column',padding:10}}>
      <SafeAreaView>
         
          <Image style={{width:330,marginTop: 110,height:150,alignSelf:'center'}} source={require('../../assets/logo.png')}/>
           <View style={{flexDirection:'row',justifyContent:'center',marginTop:50,alignItems:'center'}}>
             <Text style={{fontWeight:'bold',fontSize:30,marginTop:30}}>Welcome back!</Text>
           </View>
           
           <View style={{flexDirection:'column',marginTop:20,justifyContent:'center',alignItems:'center'}}>
              <TextInput style={styles.textInput} onChangeText={setEmail} value={email}  placeholder={"Email"}></TextInput>
              <Text style={{marginTop:10}}>Email</Text>
              <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setPassword} value={password}  placeholder={"Password"}></TextInput>
              <Text style={{marginTop:10}}>Password</Text>
              
           </View>

           <View style={{marginTop:40}}>
                 <Button uppercase={false} mode="contained" onPress={()=>{loginCheck()}} labelStyle={{color:'black',fontSize:16}} style={styles.loginButton}>Login</Button>
           </View>
      </SafeAreaView>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  
  textInput:{
      height:40,
      marginTop:16,
      borderWidth:1,
      padding:10,
      fontSize: 16,
      borderColor:'black',
      borderRadius:30,
      width:'80%',
     // alignSelf:'center'
  },
  textTitle:{
      color:'grey',
      marginTop:8,
      fontSize:14,
  },
  loginButton:{
    width:'80%',
    alignSelf:'center',
      backgroundColor:'#66b01c',
     // color:'white',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      padding:2,
      borderRadius:30
    //  top:35,
  },
})
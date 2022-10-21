import { View, Text, Alert } from 'react-native'
 
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
export const AuthContext = createContext();
 
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
             value={{
                 user,
                 setUser,
                 login: async (email,password) => {
                     try {
                        await auth().signInWithEmailAndPassword(email,password);
                     } catch (e) {
                         Alert.alert(`${e}`)
                         //console.log(e);
                     }
                 },
                 logout: async () => {
                     try {
                         await auth().signOut();
                     }catch (e){
                         console.log(e);
                     }
                 },
             }}>
            {children}
        </AuthContext.Provider>
    );
}

//export default AuthProvider
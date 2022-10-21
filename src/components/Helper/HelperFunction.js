import { PermissionsAndroid,Platform} from "react-native";
import GeoLocation from 'react-native-geolocation-service'
 
 
export const getCurrentLocation = () => 
new Promise((resolve,reject) =>{
    GeoLocation.getCurrentPosition(
        position => {
            const cords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            resolve(cords);
        },
        error => {
            reject(error.message)
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
})

export const locationPermission = () => new Promise(async (resolve,reject) =>{
    if (Platform.OS === 'ios'){
        try{
            const permissionStatus = await GeoLocation.requestAuthorization('whenInUse');
            
            if (permissionStatus === 'granted'){
                return resolve("granted") 
            }
             reject("permission not granted")
        }catch(error){
            return reject(error)
        }
    }
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted) =>{
        if (granted === PermissionsAndroid.RESULTS.GRANTED){
            resolve('granted');
        }
        return reject("location Permission Denied")
    }).catch((error) =>{
        console.log('AsK Location permission error: ',error);
        return reject(error)
    })
})
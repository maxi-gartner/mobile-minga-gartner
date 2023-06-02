import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "../pages/Index";
import Register from "../pages/Register";
import Mangas from "../pages/Mangas";
import Details from "../pages/Details";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { useCallback, useState } from "react"

const Tab = createBottomTabNavigator();

function ButtonTabsNavigator(){
    
    const [token, setToken] = useState("")
    useFocusEffect(
        useCallback(()=> {
            AsyncStorage.getItem('token').then(data => setToken(data)).catch(err => console.log(err)).catch(err => console.log(err));
        }, [])
    )
    console.log("token en navegator", token);

    return  (
        <Tab.Navigator options={{ headerShown:false , tabBarStyle: { display: 'none' }  }}>
            <Tab.Screen options={{ headerShown:false , tabBarStyle: { display: 'none' }  }} name="Index" component={Index}/>
            <Tab.Screen options={{ headerShown:false , tabBarStyle: { display: 'none' }  }} name="Mangas" component={Mangas}/>
            <Tab.Screen options={{ headerShown:false , tabBarStyle: { display: 'none' }  }} name="Details" component={Details}/>
            <Tab.Screen options={{ headerShown:false , tabBarStyle: { display: 'none' }  }} name="Register" component={Register}/>
        </Tab.Navigator>
    )
}

export default ButtonTabsNavigator
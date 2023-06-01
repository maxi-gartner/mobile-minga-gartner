import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "../pages/Index";
import Register from "../pages/Register";
import Mangas from "../pages/Mangas";

const Tab = createBottomTabNavigator();

function ButtonTabsNavigator(){
    return  (
        <Tab.Navigator options={{ headerShown:false , tabBarStyle: { display: 'none' }  }}>
            <Tab.Screen options={{ headerShown:false , tabBarStyle: { display: 'none' }  }} name="Mangas" component={Mangas}/>
            <Tab.Screen options={{ headerShown:false , tabBarStyle: { display: 'none' }  }} name="Index" component={Index}/>
            <Tab.Screen options={{ headerShown:false , tabBarStyle: { display: 'none' }  }} name="Register" component={Register}/>
        </Tab.Navigator>
    )
}

export default ButtonTabsNavigator
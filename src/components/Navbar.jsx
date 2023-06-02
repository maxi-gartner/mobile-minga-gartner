import { ColorSchemeStore } from 'nativewind/dist/style-sheet/color-scheme';
import {Button, StyleSheet, TouchableOpacity, ScrollView, Image, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native-web';
import  { useState, useEffect, useCallback } from "react"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import tw from 'twrnc'


AsyncStorage.getItem('email').then(data => {setEmail(data)}).catch(err => console.log(err))
AsyncStorage.getItem('photo').then(data => {setPhoto(data)}).catch(err => console.log(err))


const Navbar = () => {
  const [navView, setNavView] = useState(false)
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const navigation = useNavigation()

  useEffect(()=>{AsyncStorage.getItem('email').then(data => {setEmail(data)}).catch(err => console.log(err))},[navView])
  useEffect(()=>{AsyncStorage.getItem('photo').then(data => {setPhoto(data)}).catch(err => console.log(err))},[navView])

  const [token, setToken] = useState("")
    useFocusEffect(
        useCallback(()=> {
            AsyncStorage.getItem('token').then(data => setToken(data)).catch(err => console.log(err)).catch(err => console.log(err));
        }, [navView])
    )

    const clearAll = async () => {
      try {
        await AsyncStorage.clear()
      } catch(e) {
        // clear error
      }
    
      console.log('Done.')
    }

  return (
    <>
      <View style={tw.style("h-20", "w-full", "absolute", "flex", "flex-row", "justify-between", "items-center", "z-10", "bg-[#0000006c]")} className="">
        <TouchableOpacity style={tw`h-12 w-12 rounded-lg`}
                          onPress={() => setNavView(true)}>
          <Image style={tw`h-10 w-10 ml-2 rounded-lg`} source={require('../../assets/buttonHamburger.svg')} />
        </TouchableOpacity>
        <Image style={tw`h-14 w-28 mr-2 rounded-lg`} source={require('../../assets/NewLogoMinga.png')} />
      </View>

      {navView ? (
      <View style={tw.style("h-full", "w-full", "absolute", "z-10", "bg-[#0000006c]")} className=" ">
        <View style={tw.style("h-full", "w-72", "absolute", "flex", "flex-col", "z-10", "bg-[#000000f9]", "shadow-2xl", "shadow-white")}>
          <View style={tw.style("flex", "flex-col", "w-full", "p-3")} >
              <View style={tw`flex flex-row items-center justify-between`}>
                <View style={tw`flex flex-row items-center`}>
                  <Image style={tw`h-9 w-9 rounded-full`} source={{uri: `${photo}`}} />
                  <Text style={tw.style("text-white", "font-bold", "text-sm")} >{email}</Text>
                </View>
                <TouchableOpacity style={tw`h-10 w-10 rounded-lg mr-2`}
                                  onPress={() => setNavView(false)}>
                  <Image style={tw`h-10 w-10 ml-2 rounded-lg`} source={require('../../assets/buttonHamburger.svg')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`relative h-[80%] flex flex-col`}>
            <Image style={tw`absolute w-full h-full opacity-60 overflow-hidden`} source={{uri: `https://m.media-amazon.com/images/I/A1btp-E1m6L._AC_UF894,1000_QL80_.jpg`}} />
              <TouchableOpacity 
                          style={styles.buttons}
                          onPress={()=> {navigation.navigate('Index'), setNavView(false)}}>
                  <Text style={styles.appButtonText}>Home</Text>
              </TouchableOpacity>
              {token ? 
              (<TouchableOpacity 
                          style={styles.buttons}
                          onPress={()=> {navigation.navigate('Register'), setNavView(false)}}>
                  <Text style={styles.appButtonText}>Register</Text>
              </TouchableOpacity>) : ("")}
              {token ? 
              (<TouchableOpacity 
                          style={styles.buttons}
                          onPress={()=> {navigation.navigate('Mangas'), setNavView(false)}}>
                  <Text style={styles.appButtonText}>Mangas</Text>
              </TouchableOpacity>) : ("")}
              
              <TouchableOpacity 
                          style={styles.buttons}
                          /* onPress={()=> {navigation.navigate('Favorites'), setNavView(false)}} */>
                  <Text style={styles.appButtonText}>Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                          style={styles.buttons}
                          onPress={()=> {clearAll(), navigation.navigate('Index'), setNavView(false)}}>
                  <Text style={styles.appButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>) : ("")}
    </>
  );
}

const styles = StyleSheet.create({
  appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase"
  },
  buttons: {
    height: 20,
    backgroundColor: "#000000c7",
    width: "70%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical:10,
    marginTop: 20,
    marginLeft: 10,
    maxHeight: 50
  }
});

export default Navbar;

import { ColorSchemeStore } from 'nativewind/dist/style-sheet/color-scheme';
import {Button, StyleSheet, TouchableOpacity, ScrollView, Image, Text, View } from 'react-native'
import { ImageBackground } from 'react-native-web';
import  { useState, useEffect } from "react"
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
var emailLogged = localStorage.getItem('email');
var photoLogged = localStorage.getItem('photo');


const Navbar = () => {
  const [navView, setNavView] = useState(false)
  const navigation = useNavigation()

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
                  <Image style={tw`h-9 w-9 rounded-full`} source={{uri: `${photoLogged}`}} />
                  <Text style={tw.style("text-white", "font-bold", "text-sm")} >{emailLogged}</Text>
                </View>
                <TouchableOpacity style={tw`h-10 w-10 rounded-lg mr-2`}
                                  onPress={() => setNavView(false)}>
                  <Image style={tw`h-10 w-10 ml-2 rounded-lg`} source={require('../../assets/buttonHamburger.svg')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`relative h-[80%]`}>
            <Image style={tw`absolute w-full h-full opacity-60 overflow-hidden`} source={{uri: `https://m.media-amazon.com/images/I/A1btp-E1m6L._AC_UF894,1000_QL80_.jpg`}} />
              <TouchableOpacity 
                          style={styles.buttons}
                          onPress={()=> {navigation.navigate('Index'), setNavView(false)}}>
                  <Text style={styles.appButtonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                          style={styles.buttons}
                          onPress={()=> {navigation.navigate('Register'), setNavView(false)}}>
                  <Text style={styles.appButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                          style={styles.buttons}
                          onPress={()=> {navigation.navigate('Mangas'), setNavView(false)}}>
                  <Text style={styles.appButtonText}>Mangas</Text>
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
    borderRadius: 10,
    paddingVertical:10,
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#000000e7",
    width: "70%",
    marginLeft: 10
  }
});

export default Navbar;

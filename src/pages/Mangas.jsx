import { useEffect, useState } from 'react';
import {Button, StyleSheet,Image , TouchableOpacity, TextInput, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc'
import { VITE_API } from "@env"

const Mangas = () => {

    let token = () => localStorage.getItem('token')
let headers = {headers:{'Authorization' : `Bearer ${token()}`}}
const [mangas, setMangas] = useState()
const [pagAct, setNextPag] = useState(1)
console.log(mangas);

useEffect(
    ()=>{
        axios(VITE_API+`mangas?order=1&page=${pagAct}`, headers)
            .then(res=>{
                setMangas(res.data.response)
                console.log("hola")
            })
            .catch(err => console.log(err))
    },
    [pagAct]
)

    let [counter, SetCounter] = useState(0)
    useEffect(
        ()=>{
            /* const interval = setInterval( () =>{ */
                SetCounter( (counter)/*  => (counter +1) % 3 */);
            /* }, 2000); */
            /* return () => clearInterval(interval) */
        })

return (
    <View style={styles.container}>
        <Image style={tw`h-full w-full absolute`} source={require('../../assets/photo-1557683304-673a23048d34.jpeg')}/>
        <View style={tw``} >
        {counter === 0 ? (<Image style={tw`h-60 w-full`} source={require('../../assets/img1.jpeg')}/>) : counter === 1 ? (<Image style={tw`h-60 w-full`} source={require('../../assets/img2.jpeg')}/>) : (<Image style={tw`h-60 w-full`} source={require('../../assets/img3.jpeg')}/>) }
        </View>
        {/* <View style={tw`flex flex-row justify-evenly flex-wrap`}>
            <View style={tw.style("w-24", "h-40", "bg-black", "m-2")} className="">
                    <Image style={tw`h-full w-full`} source={{uri:`${mangas[1].cover_photo}`}}/>
            </View>
            <View style={tw.style("w-24", "h-40", "bg-black", "m-2")} className="">
                    <Image style={tw`h-full w-full`} source={{uri:`${mangas[1].cover_photo}`}}/>
            </View>
            <View style={tw.style("w-24", "h-40", "bg-black", "m-2")} className="">
                    <Image style={tw`h-full w-full`} source={{uri:`${mangas[1].cover_photo}`}}/>
            </View>
            <View style={tw.style("w-24", "h-40", "bg-black", "m-2")} className="">
                    <Image style={tw`h-full w-full`} source={{uri:`${mangas[1].cover_photo}`}}/>
            </View>
            <View style={tw.style("w-24", "h-40", "bg-black", "m-2")} className="">
                    <Image style={tw`h-full w-full`} source={{uri:`${mangas[1].cover_photo}`}}/>
            </View>
            <View style={tw.style("w-24", "h-40", "bg-black", "m-2")} className="">
                    <Image style={tw`h-full w-full`} source={{uri:`${mangas[1].cover_photo}`}}/>
            </View>
        </View> */}
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
});

export default Mangas;

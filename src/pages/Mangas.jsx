import { useCallback, useEffect, useState } from 'react';
import {Button,Dimensions, StyleSheet, Image, TouchableOpacity, TextInput, Text, View, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc'
import { VITE_API } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mangas = () => {

const [mangas, setMangas] = useState([])
const [categories, setCategories] = useState([])
const [page, setPage] = useState(1)
const [reload, setReload] = useState(false)
const navigation = useNavigation()
console.log(page);


useEffect(
    ()=>{
        AsyncStorage.getItem('token')
        .then(data => {
                let headers = { headers: { 'Authorization': `Bearer ${data}`} }
                axios(VITE_API + `mangas?category_id=${categoriesChecked.join(',')}&order=1&page=${page}`, headers)
                    .then(res=>{
                        setMangas(res.data.response)
                    })
                    .catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
    [page, reload]
)
useEffect(
    () => {
        AsyncStorage.getItem('token')
                    .then(data => {
                    let headers = { headers: { 'Authorization': `Bearer ${data}`} }
                        axios(VITE_API + 'categories', headers).then(res => setCategories(res.data.categories)).catch(err => console.log(err))
                    }).catch(err => console.log(err))
        },[]
    )

    let [counter, SetCounter] = useState(0)
    useEffect(
        ()=>{
            /* const interval = setInterval( () =>{ */
                SetCounter( (counter)/*  => (counter +1) % 3 */);
            /* }, 2000); */
            /* return () => clearInterval(interval) */
        })

        const [disablePrev, setDisablePrev] = useState(page>1? false: true);
        const [disableNext, setDisableNext] = useState(false);
        const handlePage = (increment) => {
            if (increment){
                setPage(page +1)
                setDisablePrev(false)
            }else{
                setPage(page -1)
                if (page=== 2){setDisablePrev(true)}
                setDisableNext(false)
            }}
        useEffect(() => {
            console.log("mangas.length", mangas.length);
            if(mangas.length > 0){setDisableNext(false)}
            if(mangas.length < 6){setDisableNext(true)}
            if (mangas.length === 0){setPage(1)}
        },[mangas])

        const [categoriesChecked, setCategoriesChecked] = useState([]);
        console.log("categoriesChecked", categoriesChecked);
        const handleCategories = (category) => {
            if(categoriesChecked.includes(category)){
                const checkedFilter = categoriesChecked.filter(cheked => cheked != category)
                setCategoriesChecked(checkedFilter)
            }else{
                setCategoriesChecked([...categoriesChecked, category])
            }
            setReload(!reload)
        }

return (
    <View style={tw`w-full h-full flex flex-row justify-center bg-black`}>
        {mangas.title
        ? (<Image style={styles.ImgBackgraund} source={require('../../assets/photo-1557683304-673a23048d34.jpeg')}/>) 
        : (<Image style={styles.ImgBackgraundFirst} source={require('../../assets/photo-1557683304-673a23048d34.jpeg')}/>)}
    <ScrollView style={styles.container}>
        <View style={tw``} >
        {counter === 0 ? (<Image style={tw`h-60 w-full`} source={require('../../assets/img1.jpeg')}/>) : counter === 1 ? (<Image style={tw`h-60 w-full`} source={require('../../assets/img2.jpeg')}/>) : (<Image style={tw`h-60 w-full`} source={require('../../assets/img3.jpeg')}/>) }
        </View>
        
        <View style={tw`w-full flex flex-row justify-evenly`}>
        {mangas.length > 0 
            ? (<TouchableOpacity style={tw`rounded-2xl w-17 mx-1 h-8 mt-5 mb-3 flex justify-center items-center font-semibold cursor-pointer bg-white`}
                            onPress={()=> {
                                setCategoriesChecked([])
                                setReload(!reload)
                            }}>
                    <Text style={tw`text-black font-bold`}>All</Text>
                </TouchableOpacity>) 
            : ("")}
            {categories?.map(element => {
                return <TouchableOpacity 
                                    key={element.name}
                                    style={tw`rounded-2xl w-17 mx-1 h-8 mt-5 mb-3 flex justify-center items-center font-semibold cursor-pointer bg-[${element.color}]`}
                                    onPress={()=> handleCategories(element._id)}>
                            <Text style={tw`text-black font-bold`}>{element.name}</Text>
                        </TouchableOpacity>
            })}
        </View>

        {<View style={tw`flex flex-row justify-evenly flex-wrap pb-10`}>
        {mangas?.map(element => {
            return <TouchableOpacity onPress={()=> {navigation.navigate('Details', {id: element._id})}} key={element.title} >
                <View style={tw.style("w-96", "h-40", "bg-black", "m-2", "rounded-xl", "flex", "flex-row", "items-end")}>
                    <Image style={tw`h-full w-full absolute rounded-xl`} source={{uri: `${element.cover_photo}`}}/>
                    <View style={tw.style("w-full", "h-10", "bg-[#000000db]", "rounded-b-xl", "flex", "flex-row", "justify-evenly", "items-center")}>
                        <Text style={tw`text-white`}>{element.title}</Text>
                        <TouchableOpacity 
                                    style={tw.style("bg-blue-800", "rounded-xl", "py-1", "w-26", "text-center")}
                                    onPress={()=> {navigation.navigate('Details', {id: element._id})}}>
                            <Text style={tw`text-white`}>Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            })}
            {mangas.length > 0 
            ? (<View style={tw`w-full h-14 flex flex-row justify-center`}>
            <View style={tw`w-96 h-14 flex flex-row justify-between`}>
                    <TouchableOpacity style={tw`h-10 flex flex-row items-center`}  
                                        onPress={()=> handlePage(false)} 
                                        disabled={disablePrev}>
                        <Image style={tw`h-10 w-10 rounded-lg`} source={require('../../assets/button-left.svg')} />
                        <Text style={tw`text-xl text-white font-semibold`}>Left</Text>
                    </TouchableOpacity>
                        <Text style={tw`text-xl text-white font-semibold h-10 flex flex-row items-center`}>Page: {page}</Text>
                    <TouchableOpacity style={tw`h-10 flex flex-row items-center`}
                                        onPress={()=> handlePage(true)} 
                                        disabled={disableNext}>
                        <Text style={tw`text-xl text-white font-semibold`}>Next</Text>
                        <Image style={tw`h-10 w-10 rounded-lg`} source={require('../../assets/button-right.svg')} />
                    </TouchableOpacity>
                </View>
            </View>) 
            : ("")}
        </View>}
    </ScrollView>
    </View>
);
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 1024
    },
    ImgBackgraund: {
        width: '100%',
        height: '100%',
        position: "absolute",
        minHeight: ScreenHeight
    },
    ImgBackgraundFirst: {
        width: '100%',
        height: ScreenHeight,
        position: "absolute"
    }
});

export default Mangas;


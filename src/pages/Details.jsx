import { useEffect, useState } from 'react';
import {Button, Dimensions, StyleSheet, Image, TouchableOpacity, TextInput, Text, View, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc'
import { VITE_API } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({route}) => {

    const [manga, setManga] = useState([])
    const [chapters, setChapters] = useState([])
    const [page, setPage] = useState(1)
    console.log("manga", manga);
    console.log("chapters", chapters);
    
    //const id = route.params.id
    const id = "6467a4184fffe0e2c1805181"
    
    useEffect(
        ()=>{
            AsyncStorage.getItem('token')
            .then(data => {
                    let headers = { headers: { 'Authorization': `Bearer ${data}`} }
                    axios(VITE_API +"mangas/"+id, headers).then(res=>{setManga(res.data.response)}).catch(err => console.log(err))
                    axios(VITE_API +`chapters?manga_id=${id}&page=${page}`, headers).then(res=> setChapters(res.data.chapters)).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                },
        [page]
    )
    
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
                if(chapters.length > 0){setDisableNext(false)}
                if(chapters.length < 4){setDisableNext(true)}
                if (chapters.length === 0){setPage(1)}
            },[chapters])
    
            const [Switchs, setSelectSwitch] = useState(true)

    return (
        <ScrollView style={styles.container}>
        <Image style={styles.ImgBackgraund} source={require('../../assets/photo-1557683304-673a23048d34.jpeg')} className="   "/>
            <View>
                <Image style={tw`h-60 w-full rounded-xl`} source={{uri: `${manga.cover_photo}`}}/>
            </View>
            <View>
                <View style={tw`h-10 rounded-full m-5 flex items-center flex-row justify-evenly`}>
                    <TouchableOpacity onPress={()=> setSelectSwitch(true)}
                            style={tw`w-30 h-8 bg-[#000000c7] rounded-lg`}>
                        <View style={tw`w-full h-full flex flex-row justify-evenly items-center`}>
                            <Text style={{display: Switchs ? 'flex' : 'none'}}>✅</Text>
                            <Text style={tw`text-lg font-semibold text-white`}>Manga</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setSelectSwitch(false)}
                            style={tw`w-30 h-8 bg-[#000000c7] rounded-lg`}>
                        <View style={tw`w-full h-full flex flex-row justify-evenly items-center`}>
                            <Text style={{display: Switchs ? 'none' : 'flex'}}>✅</Text>
                            <Text style={tw`text-lg font-semibold text-white`}>Chapers</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={tw`pb-10`}>
                {Switchs ? (<>
                    <View style={tw`text-3xl`}>
                        <Text style={tw`text-3xl w-full text-center`}>{manga?.title}</Text>
                        <View style={tw`w-full flex flex-row justify-between px-4 mt-5`}>
                            <Text style={tw``}>Category: {manga?.category_id?.name}</Text>
                            <Text style={tw``}>Company: {manga?.company_id?.name}</Text>
                        </View>
                        <Text style={tw`p-5`}>{manga?.description}</Text>
                    </View>
                    </>) : (<>
                    <View style={tw`w-full flex flex-row justify-evenly flex-wrap`}>
                        {chapters?.map(element => {
                            return <View style={tw`w-96 h-40 mb-2 rounded-xl flex flex-row`}
                                            key={element.cover_photo} >
                                <Image style={tw`h-full w-1/2 rounded-l-xl`} source={{uri: `${element.cover_photo}`}}/>
                                <Text style={tw`h-full w-1/2 rounded-r-xl text-2xl text-white bg-[#000000c7] flex flex-row justify-center items-center`}>{element.title}</Text>
                            </View>
                        })}
                    </View>
                    <View style={tw`w-full h-14 flex flex-row justify-center`}>
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
                    </View>
                    </>)}
            </View>
        </ScrollView>
    );
    }
    
    let ScreenHeight = Dimensions.get("window").height;

    const styles = StyleSheet.create({
        container: {
            width: '100%'
        },
        ImgBackgraund: {
            width: '100%',
            height: '100%',
            position: "absolute"
        }
    });

export default Details;

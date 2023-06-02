import { useEffect, useState, useCallback} from 'react';
import {Button, Dimensions, StyleSheet,Image , TouchableOpacity, TextInput, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import tw from 'twrnc'
import { VITE_API } from "@env"
console.log("api", VITE_API);

const Index = () => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    function handleForm() {
        //email: "eric@mh.com.ar",
        //password: "hola1234"
        let data = {
            email: "eric@mh.com.ar",
            password: "hola1234"
        }
        console.log("data", data);
        axios.post(VITE_API + "auth/signin", data)
            .then(res => {
                console.log(res);
                const token = res.data.token;
                const role = res.data.user.role;
                const email = res.data.user.email;
                const photo = res.data.user.photo;
                setToken(token)

                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('role', JSON.stringify(role));
                AsyncStorage.setItem('email', email);
                AsyncStorage.setItem('photo', photo);
        })
            .catch(err => { 
                console.log(err.response.data.message)
            })
        }

        const navigation = useNavigation()
        function handleNavigation() {
            console.log("botton apretado");
            navigation.navigate('Register')
            }

    const [token , setToken] = useState(null)
    useFocusEffect(
        useCallback( () => {
            AsyncStorage.getItem('token')
        .then(data => setToken(data)).catch(err => console.log(err))
        }, [])
    )
    console.log(token);

    return (
        <View style={styles.container}>
        {!token ? 
        (<><View>
            <View style={tw`w-full h-full absolute z-20 flex flex-row justify-center items-center`}>
                <Image style={tw`w-full h-full absolute`} source={{uri: `https://i.pinimg.com/originals/46/43/72/464372b288861b692d1473db70640711.jpg`}} />
                <TouchableOpacity 
                                style={tw.style("bg-[#000000db]", "rounded-xl", "py-3", "w-[45%]", "flex", "flex-row", "justify-center" , "border-[0.5px]", "border-white")}
                                onPress={close}>
                        <Text style={styles.appButtonText}>Go Sign In!</Text>
                    </TouchableOpacity>
            </View>
            <Image style={styles.ImgBackgraund} source={require('../../assets/photo-1557683304-673a23048d34.jpeg')}/>
            <View style={tw`w-80`}>
                <Text style={tw`w-full h-10 text-2xl text-center font-extrabold text-white`} className="">Sign In</Text>
                <TextInput 
                        style={styles.input}
                        placeholder={'Insert Your Email'}
                        onChangeText={onChangeUsername}/>
                <TextInput 
                        style={styles.input} 
                        placeholder={'Insert Your Password'}
                        onChangeText={onChangePassword}/>
                <View style={tw`flex flex-row justify-between`} className="">
                    <TouchableOpacity 
                                style={tw.style("bg-[#224796]", "rounded-xl", "py-3", "w-[45%]", "flex", "flex-row", "justify-center")}
                                onPress={handleNavigation}>
                        <Text style={styles.appButtonText}>Go Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                                style={tw.style("bg-[#229622]", "rounded-xl", "py-3", "w-[45%]", "flex", "flex-row", "justify-center")} 
                                className=""
                                onPress={handleForm}>
                        <Text style={styles.appButtonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View></>) : 
        (<>
        <View style={tw`w-full h-full absolute z-20 flex flex-row justify-center items-center`}>
            <Image style={tw`h-full w-full absolute`} source={{uri: `https://i.pinimg.com/564x/0e/3b/cd/0e3bcda725c6dff992091416c3ac0c4b.jpg`}} />
            {/* <Image style={tw`h-full w-full absolute`} source={require('../../assets/img4.jpeg')}/> */}
                <TouchableOpacity 
                                style={tw.style("bg-[#000000db]", "rounded-xl", "py-3", "w-[45%]", "flex", "flex-row", "justify-center" , "border-[0.5px]", "border-white")}
                                onPress={()=> {navigation.navigate('Mangas')}}>
                        <Text style={styles.appButtonText}>Explore Mangas!</Text>
                    </TouchableOpacity>
            </View>
        </>)}</View>
    );
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: ScreenHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 42,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    ImgBackgraund: {
        width: '100%',
        height: ScreenHeight,
        position: "absolute"
    }
});

export default Index;

import { useEffect, useState } from 'react';
import {Button, StyleSheet,Image , TouchableOpacity, TextInput, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc'
import { VITE_API } from "@env"
console.log("api", VITE_API);

const Index = () => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    console.log("username", username);
    console.log("password", password);

    function handleForm() {
        console.log("botton apretado");
        
        let data = {
            email: username,
            password: password
        }
        console.log("data", data);
        axios.post(VITE_API + "auth/signin", data)
            .then(res => {
                console.log("respuesta", res.data)
                const token = res.data.token;
                const role = res.data.user.role;
                const email = res.data.user.email;
                const photo = res.data.user.photo;

                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('email', email);
                localStorage.setItem('photo', photo);
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

    return (
        <View style={styles.container}>
        <Image style={tw`h-full w-full absolute`} source={require('../../assets/photo-1557683304-673a23048d34.jpeg')}/>
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
                                style={tw.style("bg-[#224796]", "rounded-xl", "py-3", "w-[45%]", "text-center")}
                                onPress={handleNavigation}>
                        <Text style={styles.appButtonText}>Go Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                                style={tw.style("bg-[#229622]", "rounded-xl", "py-3", "w-[45%]", "text-center")} 
                                className=""
                                onPress={handleForm}>
                        <Text style={styles.appButtonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: '3rem',
        backgroundColor: 'white',
        borderRadius: '5px',
        marginBottom: '10px',
        textAlign: 'center',
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase"
    }
});

export default Index;

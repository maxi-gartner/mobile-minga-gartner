import { useEffect, useState } from 'react';
import {Button, StyleSheet,Image , TouchableOpacity, TextInput, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc'
import { VITE_API } from "@env"
console.log("api", VITE_API);


const Register = () => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [img, onChangeImg] = useState('');
    console.log("username", username);
    console.log("password", password);
    console.log("img", img);

    function handleForm(e) {
        e.preventDefault();
        let data = {
            email: username,
            photo: img,
            password: password
            };
            axios.post(VITE_API + "auth/signup", data)
            .then(() => {
                console.log("usuario creado");
                e.target.reset()
            })
            .catch(err => { 
                console.log(err.response.data.message.map(message => message))
            })
        }

        
        const navigation = useNavigation()
        function handleNavigation() {
            console.log("botton apretado");
            navigation.navigate('Index')
            }
    

    return (
        <View style={styles.container}>
            <Image style={tw`h-full w-full absolute`} source={require('../../assets/photo-1557683304-673a23048d34.jpeg')}/>
            <View style={tw`w-80`}>
                <Text style={tw`w-full h-10 text-2xl text-center font-extrabold text-white`} className="">Register</Text>
                <TextInput 
                        style={styles.input}
                        placeholder={'Insert Your Email'}
                        onChangeText={onChangeUsername}/>
                <TextInput 
                        style={styles.input} 
                        placeholder={'Insert Your Img profile'}
                        onChangeText={onChangeImg}/>
                <TextInput 
                        style={styles.input} 
                        placeholder={'Insert Your Password'}
                        onChangeText={onChangePassword}/>
                <View style={tw`flex flex-row justify-between`} className="">
                    <TouchableOpacity 
                                style={tw.style("bg-[#224796]", "rounded-xl", "py-3", "w-[45%]", "text-center")} 
                                className=""
                                onPress={handleNavigation}>
                        <Text style={styles.appButtonText}>Go Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                                style={tw.style("bg-[#229622]", "rounded-xl", "py-3", "w-[45%]", "text-center")}
                                onPress={handleForm}>
                        <Text style={styles.appButtonText}>Register</Text>
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
        alignItems: 'center',
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

export default Register;

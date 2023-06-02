import { StyleSheet, Image, Text, View } from 'react-native'
import tw from 'twrnc'

const Footer = () => {
    return (
    <View style={tw.style("h-10", "w-full", "flex", "flex-row", "justify-between", "items-center", "z-10", "bg-[#000000db]", "absolute", "bottom-0")} className="">
        <Image style={tw`h-6 w-40`} source={require('../../assets/NewLogoMingaFooter.jpg')}/>
        <View style={tw`h-10 w-40 flex flex-row justify-between items-center`}>
            <Image style={tw`h-6 w-6`} source={require('../../assets/facebook.svg')}/>
            <Image style={tw`h-6 w-6`} source={require('../../assets/github.svg')}/>
            <Image style={tw`h-6 w-6`} source={require('../../assets/twitter.svg')}/>
            <Image style={tw`h-7 w-7`} source={require('../../assets/youtube.svg')}/> 
        </View>
    </View>
    );
}

export default Footer;

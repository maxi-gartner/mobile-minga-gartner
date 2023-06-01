import { StyleSheet, Image, Text, View } from 'react-native'
import tw from 'twrnc'

const Footer = () => {
    return (
    <View style={tw.style("h-20", "w-full", "flex", "flex-row", "justify-between", "items-center", "z-10", "bg-black")} className="">
        <Text style={tw.style("text-white")}>Footer</Text>
    </View>
    );
}

export default Footer;

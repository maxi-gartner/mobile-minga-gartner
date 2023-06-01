import { StyleSheet, Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'twrnc'
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import Register from './src/pages/Register';
import ButtonTabsNavigator from './src/navigation/ButtonTabsNavigator';

export default function App() {
  return (
      <NavigationContainer>
        <View style={styles.container}>
          <Navbar />
          <ButtonTabsNavigator/>
          <Footer />
        </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
});

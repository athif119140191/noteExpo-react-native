import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'

const Splash = ({ navigation }) => {
    
    useEffect(() => {
        setTimeout( () => {
            navigation.replace('MainApp');
        }, 3000)
    }, [navigation]);

    return (
       <ImageBackground 
       style={{flex:1}}
       source={require('../misc/ndp_splash.png')}
       />
    )
}

export default Splash

const styles = StyleSheet.create({
})
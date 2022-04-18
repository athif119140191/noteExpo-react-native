import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import colors from '../misc/colors';

const Splash = () => {

    return (
        <View style={styles.body}>
            <View style={{
                alignItems:'center',
                justifyContent:'center', 
                paddingTop:50,
                marginBottom:50,
                }}>
            <Image 
            style={styles.profil} 
            source={require('../misc/20190808_204457.jpg')}
            />
            </View>
            <View style={{
                alignItems:'center',
                justifyContent:'center',                
                backgroundColor:'white'
                }}>
            <Text style={styles.h1}>Athif Najmudin</Text>
            <Text style={styles.h1}>119140191</Text>
            </View>
            <View style={{
                alignItems:'flex-start',
                justifyContent:'center', 
                backgroundColor:'white',
                paddingLeft: 20,
                paddingVertical:20,
                }}>
            <Text style={styles.h2}>PAM RC</Text>
            <Text style={styles.h2}>{'React                 : Beginner\nReact Native    : Beginner\nPython              : Amateur'}</Text>
            </View>

        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
    },
    profil: {
        borderRadius:150,
        paddingTop:250,
        width:250,
        height:250,
    },
    h1: {
        fontSize:30,
        fontWeight:'bold',
        color: colors.PRIMARY,
        
    },
    h2: {        
        alignItems:'flex-start',
        fontSize:20,
        fontWeight:'normal',
        color: colors.PRIMARY
    },
})
import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import image from '../assets/images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';

export default InnerComp => {
    return props => {
        return (
        <View style={{flex:1}}>
            <View style={[styles.headerStyle]}>
                <Image source={image} style={[styles.headerTitleStyle],{width:142, height:41}} />
            </View>
            <View  style={{flex:1}} >
                <InnerComp/>
            </View>
        </View>
        )
    }
};

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerStyle: {
        backgroundColor: 'black',
        alignItems:'center',
        justifyContent:'center',
        height:57,
    },
});
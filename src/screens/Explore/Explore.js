
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import HeaderIcon from '../../HOC/HeaderIcon.js';
import InputField from '../../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ExploreScreen = (props) => {
 

    return(
        <View style={{flex:1}}>
            
            <View style={styles.searchContainer}>
            <InputField 
                placeholder="Search"
                placeholderTextColor = "#1a202c"
                //  onChangeText={handleChange('username')}
                //  onBlur={handleBlur('username')}
                //  value={values.username}
                inputContainerStyles={{}}
                  containerStyles = {styles.containerStyles}
            />
            <TouchableOpacity  style={styles.icon}>
                <Icon name="search-outline" size={22} color="#1a202c"/>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles  = StyleSheet.create ({
   
    searchContainer:{
        flexDirection:'row'
    },
     
    containerStyles:{
        width:'75%',
        backgroundColor:"#edf2f7",
    },
    
})

export default HeaderIcon(ExploreScreen);
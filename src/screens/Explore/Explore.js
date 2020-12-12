
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions,ScrollView} from 'react-native';
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
                <Icon name="search-outline" size={25} color="#1a202c"/>
            </TouchableOpacity>
            </View>

                <ScrollView style={{flex:1,backgroundColor:'red',marginTop:10}}>
                    <View style={{height:windowHeight/2.5,backgroundColor:'orange',flexDirection:'row'}}>
                        <View style={{height:windowHeight/2.5,backgroundColor:'pink',width:windowWidth/3}}>
                            <View style={{height:windowHeight/5,backgroundColor:'black'}}>

                            </View>
                            <View style={{height:windowHeight/5,backgroundColor:'pink'}}>

                            </View>
                        </View>
                        <View style={{height:windowHeight/2.5,width:windowWidth-windowWidth/3,backgroundColor:'blue'}}>

                        </View>
                    </View>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <View style={{height:150,width:windowWidth/3,backgroundColor:'black'}}>

                        </View>
                        <View style={{height:150,width:windowWidth/3,backgroundColor:'white'}}>

                        </View>
                        <View style={{height:150,width:windowWidth/3,backgroundColor:'black'}}>

                        </View>
                        <View style={{height:150,width:windowWidth/3,backgroundColor:'black'}}>

                        </View>
                        <View style={{height:150,width:windowWidth/3,backgroundColor:'white'}}>

                        </View>
                        <View style={{height:150,width:windowWidth/3,backgroundColor:'black'}}>

                        </View>
                    </View>
                
                </ScrollView>
      
            
        </View>
    )
}

const styles  = StyleSheet.create ({
   
    searchContainer:{
        marginTop:10,
        flexDirection:'row',
        width:'95%',
        alignSelf:'center'
    },
     
    containerStyles:{
        backgroundColor:"#edf2f7",
        borderColor:"black",
        borderWidth:1
    },
    icon:{
        justifyContent:'center'
    }
})

export default HeaderIcon(ExploreScreen);
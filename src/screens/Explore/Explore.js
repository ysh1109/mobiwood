
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions,ScrollView} from 'react-native';
import HeaderIcon from '../../HOC/HeaderIcon.js';
import InputField from '../../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreVideoTop from '../../components/ExploreVideoTop';
import ExploreVideoBottom from '../../components/ExploreVideoBottom';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Image3 from "../../assets/images/image3.jpeg";
import Image4 from "../../assets/images/image4.jpeg";
const blogPosts = [
    {
      postId: "1",
      img:Image4,
      title: "Finding Amazing Events Near You - Fast, Cheap & Free",
      url: "https://timerse.com",
    },
    {
      postId: "2",
      img:Image3,
      title: "The Top Rated Musical Concerts Worldwide in 2019",
      url: "https://reddit.com",
    },
    {
      postId: "7",
      img:Image4,
      title: "This female band is making buzz all over the world",
      url: "https://timerse.com",
    },
    {
      postId: "8",
      img:Image3,
      title: "This female band is making buzz all over the world",
      url: "https://timerse.com",
    },
    {
      postId: "3",
      img:Image4,
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Sam Phipphen",
      url: "/v",
    },
    {
      postId: "4",
      img:Image3,
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Tony Hawk",
      url: "/v",
    },
    {
      postId: "5",
      img:Image4,
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Himali Turn",
      url: "/v",
    },
    {
      postId: "6",
      img:Image3,
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Tony Hawk",
      url: "/v",
    },
  ];

const HandleClick=(e)=> {
    console.warn(
        e
    )
}
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

                <ScrollView style={{flex:1,marginTop:10}}>
                   <ExploreVideoTop video={blogPosts}/>
                   <ExploreVideoBottom  clicked={HandleClick}  video={blogPosts}/>
                    
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
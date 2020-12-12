import React from 'react'
import {View,Text,Image}from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import Image3 from "../assets/images/image3.jpeg"
import Image4 from "../assets/images/image4.jpeg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';


const blogPosts = [
    {
      postId: "1",
      imageSrc: Image3,
      category: "Event Tips",
      title: "Finding Amazing Events Near You - Fast, Cheap & Free",
      url: "https://timerse.com",
    },
    {
      postId: "2",
      imageSrc: Image4,
      category: "Reviews",
      title: "The Top Rated Musical Concerts Worldwide in 2019",
      url: "https://reddit.com",
    },
    {
      postId: "7",
      imageSrc: Image3,
      category: "Discover",
      title: "This female band is making buzz all over the world",
      url: "https://timerse.com",
    },
    {
      postId: "8",
      imageSrc: Image4,
      category: "Discover",
      title: "This female band is making buzz all over the world",
      url: "https://timerse.com",
    },
    {
      postId: "3",
      imageSrc: Image3,
      title: "Choosing the perfect Safaris in Africa",
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Sam Phipphen",
      url: "/v",
    },
    {
      postId: "4",
      imageSrc: Image4,
      title: "Hiking during the monsoon in Asia",
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Tony Hawk",
      url: "/v",
    },
    {
      postId: "5",
      imageSrc: Image3,
      title: "Must carry items while travelling to Thailand",
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Himali Turn",
      url: "/v",
    },
    {
      postId: "6",
      imageSrc: Image4,
      title: "Hiking during the monsoon in Asia",
      description:
        "Lorem ipsum dolor sit amet, consecteturious adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua now ele.",
      authorName: "Tony Hawk",
      url: "/v",
    },
  ];

  let codeBlock = "@abhishekgill"
export default function ImageGrid(props){
    return(
        <View style={styles.imageGrid}>
            {blogPosts.map((post,index) => (
                <View key={index} style={styles.imgContainer}> 
                <View style={{paddingTop:5}}>
                <Image source={require('../assets/images/usericon.jpg')} style={{width:40, height:40, marginLeft:10, marginTop:8, marginBottom:8, borderRadius:60, borderWidth:1, borderColor:'#bbb',}} />
                <View style={{}}>
                <Text style={{marginTop:8, marginLeft:12, fontWeight:'bold', fontSize:15, position:'absolute', top:-55, left:50}}>Abhishek Gill</Text>
                <Text style={{position:'absolute', top:-27, left:62, fontSize:12, color:'grey'}}>{codeBlock}</Text>
                <Text style={{padding:10}}>Phasellus viverra ipsum dictum ipsum consectetur euismod... <Text style={{color: '#6b6b6b', fontWeight:'800'}} onPress={() => Linking.openURL('http://google.com')}> more </Text> {"\n"}{"\n"}#Mobiwood #Entertainment</Text>
                </View>
                <FeatherIcon
               
                name='more-horizontal'
                 size={24} color='black' 
                style={{position:'absolute', right:25, marginTop:20 }} />
                </View>
                <Image source ={post.imageSrc} style={styles.img}/>
                <View style={{paddingLeft:20, marginTop:12, marginBottom:20, display:'flex', flexDirection:'row'}}>
                <Text style={{fontSize:20}}><FeatherIcon name='thumbs-up' size={24} color='black' /> 223 </Text>
                <Text style={{marginLeft:20, fontSize:20}} ><FeatherIcon  onPress={props.shareModal}  name='share-2' size={24} color='black' /> 5 </Text>
                <Text style={{marginLeft:20, fontSize:20,}}><FeatherIcon name='eye' size={24} color='black' /> 235 </Text> 
                </View> 
                </View>
            ))}
        </View>
    );
}

const styles = ScaledSheet.create({
    imageGrid:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginLeft:"-20@ms",
    },
    imgContainer:{
        padding:"0@ms",
    },
    img:{
        width:wp('100%'),
        borderRadius:"0@ms"
    }
})
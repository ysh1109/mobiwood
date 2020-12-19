import React from 'react'
import {View,Text,Image, FlatList, TouchableOpacity}from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import Image3 from "../assets/images/image3.jpeg"
import Image4 from "../assets/images/image4.jpeg";
import Video from 'react-native-video-player';
import {VideosContext} from '../contexts/VideosContext.js';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { UserContext } from '../contexts/UserContext';

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
    let videoContext = React.useContext(VideosContext);
    const usrCntxt = React.useContext(UserContext);

    return(
        <View style={styles.imageGrid}>
            <FlatList 
              ref={input => (flatListRef = input)}
              data = {videoContext.videos}
              keyExtractor={(item, index) => index.toString()}
              renderItem = {({item, index}) =>  (
                <View style={styles.imgContainer}> 
                  <View style={{paddingTop:5}}>
                  <Image source={require('../assets/images/usericon.png')} style={{width:40, height:40, marginLeft:10, marginTop:8, marginBottom:8, borderRadius:60, borderWidth:1, borderColor:'#bbb',}} />
                  <View style={{}}>
                  <Text style={{marginTop:8, marginLeft:12, fontWeight:'bold', fontSize:15, position:'absolute', top:-55, left:50}}>{!item.name?"Abhishek":item.name}</Text>
                  <Text style={{position:'absolute', top:-27, left:62, fontSize:12, color:'grey'}}>{codeBlock}</Text>
                  <Text style={{padding:10}}>{item.description}</Text>
                  </View>
                  <FeatherIcon
                    name='more-horizontal'
                    size={24} color='black' 
                    style={{position:'absolute', right:25, marginTop:20 }} />
                  </View>
                  <Video thumbnail={{uri:item.thumbnail}} video={{uri:item.videoUrl}} style={styles.img}/>
                  <View style={{paddingLeft:20, marginTop:12, marginBottom:20, display:'flex', flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{
                    usrCntxt.updateLikes(item.id)
                    firestore().collection("contest").doc(item.id).update({
                      likes: item.likes+1,
                    })
                    .then(()=>{
                    })
                  }}>
                  <Text style={{fontSize:17}}><FeatherIcon name='thumbs-up' size={20} color='black' /> {item.likes?item.likes:0}</Text>
                  </TouchableOpacity>
                  <Text style={{marginLeft:20, fontSize:17}} ><FeatherIcon  onPress={props.shareModal}  name='share-2' size={20} color='black' /> {item.shares?item.shares:0}</Text>
                  <Text style={{marginLeft:20, fontSize:17,}}><FeatherIcon name='eye' size={20} color='black' /> {item.views?item.views:'0'}</Text> 
                  </View> 
                </View>
              )}
            />
        </View>
    );
}

const styles = ScaledSheet.create({
    imageGrid:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    imgContainer:{
        padding:"0@ms",
    },
    img:{
        width:wp('100%'),
        borderRadius:"0@ms"
    }
})
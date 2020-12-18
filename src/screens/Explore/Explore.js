
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions,ScrollView,Modal,TouchableHighlight,Alert} from 'react-native';
//import HeaderIcon from '../../HOC/HeaderIcon.js';
import InputField from '../../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreVideoTop from '../../components/ExploreVideoTop';
import ExploreVideoBottom from '../../components/ExploreVideoBottom';
import VideoPlayer from 'react-native-video-player';
import VideosContext from '../../contexts/VideosContext.js';
import video from '../../assets/videos/video.mp4';
const windowWidth = Dimensions.get('window').width;

import FeatherIcon from 'react-native-vector-icons/Feather';
const windowHeight = Dimensions.get('window').height;
import {UserContext} from '../../contexts/UserContext.js';

import firestore from '@react-native-firebase/firestore';
import Image3 from "../../assets/images/image3.jpeg";
import Image4 from "../../assets/images/image4.jpeg";
import { FlatList } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
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


const ExploreScreen = (props) => {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail,setThumbnail] = useState('');
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [vidId, setVidId] = useState('');
  const [shares, setShares] = useState(0);
  const [vidLiked, setVidLiked] = useState(false);
  const usrCntxt = React.useContext(UserContext);
  const HandleClick = (e,t, l, v, s, id) => {
    setVideoUrl(e);
    setThumbnail(t);
    setLikes(l);
    setViews(v);
    setShares(s);
    setVidId(id);
    setModalVisible(true);
  }
  React.useEffect(()=>{
    // alert(`likedVideos : ${usrCntxt.likedVideos}`)
  },[])
    return(
        <View style={{flex:1}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
              setVideoUrl('');
            }}
          >
            <View style={{justifyContent:'center',flex:1}}>
                <View style={styles.centeredView}>
                <VideoPlayer
                    video={{uri:videoUrl}}
                    style={{height:windowHeight/1.45,width:windowWidth-50}}
                    thumbnail={{uri: thumbnail}}
                  />
                {/* <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>
               */}
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{
                    usrCntxt.updateLikes(vidId)
                    firestore().collection("contest").doc(vidId).update({
                      likes: likes+1,
                    })
                    .then(()=>{
                      setVidLiked(true);
                    })
                  }}>
                    <Text style={{color:!vidLiked?'black':'pink'}}> <FeatherIcon name='thumbs-up' size={30} color='black' />{likes}  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{color:'black'}}> <FeatherIcon  name='share-2' size={30} color='black' />{shares}  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                    firestore().collection("contest").doc(vidId).update({
                      views: views+1,
                    });
                  }}>
                    <Text> <FeatherIcon  name='eye' size={30} color='black' /> {views}</Text>
                  </TouchableOpacity>
                </View>
                </View>
            </View>
            
          </Modal>
  
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={25} color="#1a202c" style={{position:'absolute',zIndex:9999, left:13, top:12}}/>
            <InputField  
                placeholder="Search"
                placeholderTextColor = "#1a202c"
                //  onChangeText={handleChange('username')}
                //  onBlur={handleBlur('username')}
                //  value={values.username}
                  containerStyles = {styles.containerStyles}
            />
            <TouchableOpacity style={[styles.icon], {display:'none'}}>
                <Icon name="search-outline" size={25} color="#1a202c"/>
            </TouchableOpacity>
            </View>

            <View style={{flex:1,marginTop:10}}>
                {/* <ExploreVideoTop video={blogPosts}/> */}
                <ExploreVideoBottom  clicked={HandleClick}  video={blogPosts}/>
                
            </View>
      
            
        </View>
    )
}

const styles  = StyleSheet.create ({
   
    searchContainer:{
        marginTop:10,
        width:'95%',
        marginLeft:10,
    },
     
    containerStyles:{
        backgroundColor:"#ddd",
        borderColor:"#fff",
        borderRadius:6,
        paddingLeft:40,
        width:'100%',
    },
    icon:{
        justifyContent:'center'
    },
    centeredView: {
      height:windowHeight/1.3,
      width:windowWidth-50,
      justifyContent:'center',
      alignSelf:'center',
      alignItems: "center",
      backgroundColor: "white",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
})


export default ExploreScreen;
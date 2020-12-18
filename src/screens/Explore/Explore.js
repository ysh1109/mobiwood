
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity, TextInput, Image,Dimensions,ScrollView,Modal,TouchableHighlight,Alert} from 'react-native';
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
  const [vidUploaderId, setVidUploaderId] = useState(null);
  const [shares, setShares] = useState(0);
  const [following, setFollowing] = useState(false);
  const [vidLiked, setVidLiked] = useState(false);
  const usrCntxt = React.useContext(UserContext);
  const HandleClick = (e,t, l, v, s, id, uid) => {
    setVideoUrl(e);
    setThumbnail(t);
    setLikes(l);
    setViews(v);
    setShares(s);
    setVidId(id);
    setVidUploaderId(uid);
    setModalVisible(true);
  }
  React.useEffect(()=>{
    setFollowing(false);
    // alert(`likedVideos : ${usrCntxt.likedVideos}`)
  },[])
    return(
        <View style={{flex:1}}>
          <Modal
            animationType="fade"
            transparent={true}
            // style={{}}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
              setVideoUrl('');
            }}
          >
            <View style={{justifyContent:'center',flex:1, backgroundColor:'rgba(0,0,0,0.8)'}}>
                <View style={styles.centeredView}>
                  <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={{backgroundColor:'white', borderRadius:1000, borderWidth:2, borderColor:'black', position:'absolute', zIndex:10, top:-10, right:-10, alignSelf:'flex-end'}}>
                  
                    <FeatherIcon  name='x' size={30} color='grey' />
                </TouchableOpacity>
                <VideoPlayer
                    video={{uri:videoUrl}}
                    style={{height:windowHeight/1.45,width:windowWidth-50, borderTopStartRadius:20, borderTopEndRadius:20}}
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
                <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{
                      usrCntxt.updateLikes(vidId)
                      firestore().collection("contest").doc(vidId).update({
                        likes: likes+1,
                      })
                      .then(()=>{
                        setVidLiked(true);
                      })
                    }}>
                      <Text style={{color:!vidLiked?'black':'pink', fontSize:20}}> <FeatherIcon name='thumbs-up' size={25} color='black' />  {likes?likes:0}  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{color:'black',fontSize:20}}> <FeatherIcon  name='share-2' size={25} color='black' />  {shares?shares:0}  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                      firestore().collection("contest").doc(vidId).update({
                        views: views+1,
                      });
                    }}>
                      <Text style={{fontSize:20}}> <FeatherIcon  name='eye' size={25} color='black' />  {views?views:0}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{position:'absolute', right:10, top:8}}>
                    <TouchableOpacity onPress={()=>{
                      usrCntxt.updateFollowing("follow", vidUploaderId)
                      .then(()=>{
                        setFollowing(true);
                      })
                    }}>
                      <Text style={{backgroundColor:following?'grey':'red', color:'white', paddingHorizontal:10, paddingVertical:5, borderRadius:10,fontSize:20}}>{following?'Following':'Follow'}</Text>
                    </TouchableOpacity>
                  </View>
                  
                  
                </View>
                </View>
            </View>
            
          </Modal>
  
          <View style={styles.searchContainer}>
            <View style={{flexDirection:'row', backgroundColor:'white', borderRadius:10}}>
              <View style={{flex:0.9}}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor = "#1a202c"
                  keyboardType={"ascii-capable"}
                  style={{marginLeft:10}}
                />
              </View>
              <View style={{flex:0.1}}>
                <TouchableOpacity>
                  <Icon name="search-outline" style={{marginTop:10}} size={25} color="#1a202c"/>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={[styles.icon], {display:'none'}}>
                <Icon name="search-outline" size={25} color="#1a202c"/>
            </TouchableOpacity>
            </View>

            <View style={{flex:1,marginTop:10}}>
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
        // backgroundColor:'black'
    },
    icon:{
        justifyContent:'center'
    },
    centeredView: {
      height:windowHeight/1.3,
      width:windowWidth-50,
      borderRadius:20,
      // justifyContent:'center',
      alignSelf:'center',
      // alignItems: "center",
      backgroundColor: "white",
      // padding: 35,
      // alignItems: "center",
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
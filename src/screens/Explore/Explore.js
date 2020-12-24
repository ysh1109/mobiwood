
import React,{useState} from 'react';
import {View,
  StyleSheet,
  Text,
  TouchableOpacity, 
  TextInput,
  ToastAndroid,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreVideoBottom from '../../components/ExploreVideoBottom';
import VideoPlayer from 'react-native-video-player';
import VideosContext from '../../contexts/VideosContext.js';
import video from '../../assets/videos/video.mp4';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;

import FeatherIcon from 'react-native-vector-icons/Feather';
const windowHeight = Dimensions.get('window').height;
import {UserContext} from '../../contexts/UserContext.js';

import firestore from '@react-native-firebase/firestore';

export default props => {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [vidObj, setVidObj] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const vidCntxt = React.useContext(VideosContext);
  const usrCntxt = React.useContext(UserContext);
  const [searchVid, setSearchVid] = useState(false);
  const HandleClick = (item) => {
    setVidObj(item);
    // console.log(`CURRENT VIDEO ON MODAL : ${vidCntxt.noOfViewsMap.get(item.id)} , item : ${JSON.stringify(item)}`);
    setModalVisible(true);
  }
    return(
        <View style={{flex:1}}>
          <Modal
            animationType="fade"
            transparent={true}
            // style={{}}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
              setVidObj({});
            }}
          >
            <View style={{justifyContent:'center',flex:1, backgroundColor:'rgba(0,0,0,0.8)'}}>
                <View style={styles.centeredView}>
                  <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={{backgroundColor:'rgba(0,0,0,0.7)',  position:'absolute', padding:5, zIndex:10, top:20, right:8, alignSelf:'flex-end'}}>
                  <FeatherIcon name='x' size={30} color='white' />
                </TouchableOpacity>
                <VideoPlayer
                    video={{uri:videoUrl}}
                    style={{height:windowHeight/1,width:windowWidth-0}}
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
                <View style={{flexDirection:'row',position:'absolute', bottom:'4%', width:'100%'}}>
                 <LinearGradient
          colors={['rgba(52, 52, 52, 0.3)', 'rgba(52, 52, 52, 0.3)']}
          style={styles.linearGradient}
        >
                  <View style={{alignSelf:'flex-start', flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{
                      usrCntxt.updateLikes(vidObj.id, vidCntxt.vidLikesMap.get(vidObj.id)).then(reslt => {
                        // console.log(`vidLiked : ${reslt}`)
                        if(Platform.OS === "android")
                          if(reslt>vidCntxt.vidLikesMap.get(vidObj.id))
                            ToastAndroid.show(`You Liked This Video`, ToastAndroid.LONG)
                          // else
                          //   ToastAndroid.show(`Like Cleared!`, ToastAndroid.LONG);
                        let tmp = new Map(vidCntxt.vidLikesMap);
                        tmp.set(vidObj.id, reslt);
                        vidCntxt.setVidLikesMap(tmp);
                      })
                      
                    }}>
                      <Text style={{color:!vidLiked?'white':'white', fontSize:20}}> <FeatherIcon name='thumbs-up' size={20} color='white' />  {likes?likes:0}  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{color:'white',fontSize:20}}> <FeatherIcon  name='share-2' size={20} color='white' />  {shares?shares:0}  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                      firestore().collection("contest").doc(vidId).update({
                        views: views+1,
                      });
                    }}>
                      <Text style={{fontSize:20, color:'white'}}> <FeatherIcon  name='eye' size={20} color='white' />  {views?views:0}</Text>
                    </TouchableOpacity>
                      <Text style={{fontSize:20}}> <FeatherIcon  name='eye' size={25} color='black' /> {vidCntxt.noOfViewsMap.get(vidObj.id)}</Text>
                  </View>
                  <View style={{position:'absolute', right:10, top:15}}>
                    <TouchableOpacity onPress={()=>{
                      usrCntxt.updateFollowing(usrCntxt.fllwingMap.get(vidObj.userid)?"unfollow":"follow", vidObj.userid).then(resp=>{
                        if(resp === "followed"||resp === "unfollowed")
                        {
                          if(Platform.OS === "android")
                            if(resp === "followed")
                            ToastAndroid.show(`Following `, ToastAndroid.LONG)
                            else
                            ToastAndroid.show(`Unfollowed `, ToastAndroid.LONG)
                        }
                      })
                    }}>
                      <Text style={{backgroundColor:following?'grey':'red', color:'white', paddingHorizontal:10, paddingVertical:5, borderRadius:2,fontSize:16}}>{following?'Following':'Follow'}</Text>
                    </TouchableOpacity>
                  </View>
                  </LinearGradient>
                  
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
                  onChangeText={inpt => {console.log(`inpt : ${inpt}`); setSearchKeyword(inpt)}}
                />
              </View>
              <View style={{flex:0.1}}>
                <TouchableOpacity>
                  <Icon name="search-outline" onPress={()=>setSearchVid(true)} style={{marginTop:10}} size={25} color="#1a202c"/>
                </TouchableOpacity>
              </View>
            </View>
            </View>

            <View style={{flex:1,marginTop:10}}>
              <ExploreVideoBottom searchKeyword={searchKeyword} setSearchVid={setSearchVid} searchVid={searchVid} clicked={HandleClick}/>
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
      height:windowHeight/1,
      width:windowWidth-0,
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
    },
    linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    paddingLeft:15,
    paddingTop:10
  },
})



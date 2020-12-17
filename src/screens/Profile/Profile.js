import React,{useState} from 'react';
import {View, Text, Image,StyleSheet,FlatList,Dimensions,Modal} from 'react-native';
import {UserContext} from '../../contexts/UserContext.js';
import {AuthContext} from "../../contexts/AuthContext.js";

import VideoPlayer from 'react-native-video-player';
import ExploreVideoBottom from '../../components/ExploreVideoBottom';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default props => {
    let userCont = React.useContext(UserContext);
    const { userDetails, uid } = React.useContext(AuthContext);
    React.useEffect(()=>{
        // userCont.updateFollowers();
    },[])

    const HandleClick = (e,t) => {
        setVideoUrl(e);
        setThumbnail(t)
        setModalVisible(true);
      }
      
 
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail,setThumbnail] = useState('');
    return (
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
                        style={{height:windowHeight/1.4,width:windowWidth-50}}
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
                    </View>
    
                </View>
              </Modal>
            {userCont?
                <>

                <View style={{flex:1}}>
                    <View style={{marginBottom:20}}>
                        <Image
                            source={require('../../assets/images/usericon.png')}
                            style={{height:150,width:150,alignSelf:'center'}}
                        />
                        <Text style={{fontSize:24,fontWeight:'700',alignSelf:'center'}}>{userDetails.providerData[0].displayName}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
                                <Text style={{fontSize:24,fontWeight:'700'}}>Followers : {userCont.followers.length!=0?userCont.followers:0} </Text>
                                <Text style={{fontSize:24,fontWeight:'700'}}>Following : {userCont.following.length!=0?userCont.followers:0} </Text>
                        </View>
                    </View>
                    <View style={{width:'100%',height:1,backgroundColor:"black"}}></View>
                    {/* {console.log(userCont.myVideos._data.videoUrl)} */}
                    {userCont.myVideos!=""? 
                    <FlatList 
                        data={userCont.myVideos}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index})=>(
                            <View key={index}  style={styles.layoutA}>
                                {console.log(item)}
                                <TouchableOpacity onPress={()=>HandleClick(item.videoUrl,item.thumbnail)} >
                                <Image
                            source={item.thumbnail?{uri:item.thumbnail}:(require('../../assets/images/play.png'))}
                            style={{height:"100%",width:"100%"}}
                        />
                        </TouchableOpacity>
                        
                    </View>)
                         }
            /> : <Text style={{justifyContent:'center',alignSelf:'center',marginTop:20,fontWeight:'700'}}>No Videos Uploaded</Text>}
                </View>
                
                
                </>
                :
                <View>
                    <Text>HELLO</Text>
                </View>
            }
        </View>

    )
};

const styles = StyleSheet.create({
    layoutA :{height:150,width:windowWidth/3,backgroundColor:'black'},
    layoutB:{height:150,width:windowWidth/3,backgroundColor:'white'} ,
    centeredView: {
        height:windowHeight/1.4,
        width:windowWidth-50,
        justifyContent:'center',
        alignSelf:'center',
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
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
})
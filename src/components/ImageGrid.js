import React from 'react'
import {View,Text,Image, FlatList, TouchableOpacity, ToastAndroid, Platform}from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import Video from 'react-native-video-player';
import {VideosContext} from '../contexts/VideosContext.js';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { UserContext } from '../contexts/UserContext';


let codeBlock = "@abhishekgill";
export default function ImageGrid(props){
    const videoContext = React.useContext(VideosContext);
    const usrCntxt = React.useContext(UserContext);

    return(
        <View style={styles.imageGrid}>
            <FlatList 
              ref={input => (flatListRef = input)}
              data = {videoContext.videos}
              keyExtractor={(item, index) => index.toString()}
              renderItem = {({item, index}) =>  (
                <View style={styles.imgContainer}> 
                  <View style={{paddingTop:10}}>
                  <Image source={require('../assets/images/usericon.png')} style={{width:30, height:30, marginLeft:10, marginTop:0, marginBottom:0, borderRadius:60, borderWidth:1, borderColor:'#bbb',}} />
                  <View style={{}}>
                  <Text style={{marginTop:8, marginLeft:12, fontWeight:'bold', fontSize:15, position:'absolute', top:-35, left:40}}>{!item.displayName?"Mobiwood User":item.username}</Text>
                  
                  <Text style={{padding:10, paddingTop:15}}>{item.description}</Text>
                  </View>
                  <FeatherIcon
                    onPress={props.reportModal}
                    name='more-horizontal'
                    size={28} color='black' 
                    style={{position:'absolute', right:25, marginTop:10 }} />
                  </View>
                  <Video thumbnail={{uri:item.thumbnail}} video={{uri:item.videoUrl}} style={styles.img}/>
                  <View style={{paddingLeft:20, marginTop:12, marginBottom:20, display:'flex', flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{
                    usrCntxt.updateLikes(item.id, videoContext.vidLikesMap.get(item.id)).then(reslt => {
                      // console.log(`vidLiked : ${reslt}`)
                      if(Platform.OS === "android")
                        if(reslt>videoContext.vidLikesMap.get(item.id))
                          ToastAndroid.show(`You Like This Video`, ToastAndroid.LONG)
                        // else
                        //   ToastAndroid.show(`Like Cleared!`, ToastAndroid.LONG);
                      let tmp = new Map(videoContext.vidLikesMap);
                      tmp.set(item.id, reslt);
                      videoContext.setVidLikesMap(tmp);
                    })
                  }}>
                  <Text style={{fontSize:17}}><FeatherIcon name='thumbs-up' size={20} color={videoContext.vidLikesMap.get(item.id)?'#2078f4':'black'} />  {videoContext.vidLikesMap.get(item.id)}</Text>
                  </TouchableOpacity>
                  <Text style={{marginLeft:20, fontSize:17}} ><FeatherIcon  onPress={props.shareModal}  name='share-2' size={20} color='black' /> {item.shares?item.shares:0}</Text>
                  <Text style={{marginLeft:20, fontSize:17,}}><FeatherIcon name='eye' size={20} color='black' /> {videoContext.noOfViewsMap.get(item.id)}</Text> 
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
import React from 'react';
import {View, Text, Image,StyleSheet,FlatList,Dimensions} from 'react-native';
import {UserContext} from '../../contexts/UserContext.js';
import {AuthContext} from "../../contexts/AuthContext.js";
import ExploreVideoBottom from '../../components/ExploreVideoBottom';
import FeatherIcon from 'react-native-vector-icons/Feather';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default props => {
    let userCont = React.useContext(UserContext);
    const { userDetails, uid } = React.useContext(AuthContext);
    React.useEffect(()=>{
        // userCont.updateFollowers();
    },[])
    return (
        <View style={{flex:1}}>
            {userCont?
                <>

                <View style={{flex:1}}>
                    <View style={{marginBottom:20}}>
                        <Image
                            source={require('../../assets/images/usericon.png')}
                            style={{height:50,width:50,alignSelf:'center', marginTop:20}}
                        />
                        <Text style={{fontSize:20,fontWeight:'700',alignSelf:'center', marginBottom:10}}>{userDetails.providerData[0].displayName}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:5}}>
                                <Text style={{fontSize:16,fontWeight:'400'}}>Followers : {userCont.followers!=""?userCont.followers:0} </Text>
                                <Text style={{fontSize:16,fontWeight:'400'}}>Following : {userCont.following!=""?userCont.followers:0} </Text>
                        </View>
                    </View>
                    <View style={{width:'100%',height:1,backgroundColor:"#e3e3e3"}}></View>

                    {userCont.myVideos!=""? 
                    <FlatList 
                        data={userCont.myVideos}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index})=>(
                            <View key={index}  style={styles.layoutB}>
                                <TouchableOpacity onPress={()=>props.clicked(item.videoUrl,item.thumbnail)} >
                                <Image
                            source={item.thumbnail?{uri:item.thumbnail}:(require('../../assets/images/loading.jpg'))}
                            style={{height:"100%",width:"100%"}}
                        />
                        </TouchableOpacity>
                        
                    </View>)
                         }
            /> : 
            
            <Text style={{justifyContent:'center',alignSelf:'center',marginTop:80,fontWeight:'700',fontSize:18, textAlign:'center', color:'grey'}}>
                <FeatherIcon name="video-off" size={50} color={'grey'} />{"\n"}{"\n"}
                No Videos Uploaded</Text>}
             
                </View>
                
                
                </>
                :
                <View>
                    <Text>HEsLLO</Text>
                </View>
            }
        </View>

    )
};

const styles = StyleSheet.create({
    layoutA :{height:150,width:windowWidth/3,backgroundColor:'black'},
    layoutB:{height:150,width:windowWidth/3,backgroundColor:'white'} 
})
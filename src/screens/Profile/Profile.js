import React from 'react';
import {View, Text, Image,StyleSheet,FlatList,Dimensions} from 'react-native';
import {UserContext} from '../../contexts/UserContext.js';
import {AuthContext} from "../../contexts/AuthContext.js";
import ExploreVideoBottom from '../../components/ExploreVideoBottom';
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
                            style={{height:150,width:150,alignSelf:'center'}}
                        />
                        <Text style={{fontSize:24,fontWeight:'700',alignSelf:'center'}}>{userDetails.providerData[0].displayName}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
                                <Text style={{fontSize:24,fontWeight:'700'}}>Followers : {userCont.followers!=""?userCont.followers:0} </Text>
                                <Text style={{fontSize:24,fontWeight:'700'}}>Following : {userCont.following!=""?userCont.followers:0} </Text>
                        </View>
                    </View>
                    <View style={{width:'100%',height:1,backgroundColor:"black"}}></View>

                    {userCont.myVideos!=""? 
                    <FlatList 
                        data={userCont.myVideos}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index})=>(
                            <View key={index}  style={styles.layoutB}>
                                <TouchableOpacity onPress={()=>props.clicked(item.videoUrl,item.thumbnail)} >
                                <Image
                            source={item.thumbnail?{uri:item.thumbnail}:(require('../../assets/images/play.png'))}
                            style={{height:"100%",width:"100%"}}
                        />
                        </TouchableOpacity>
                        
                    </View>)
                         }
            /> : <Text style={{justifyContent:'center',alignSelf:'center',marginTop:20,fontWeight:'700',fontSize:24}}>No Videos Uploaded</Text>}
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
    layoutB:{height:150,width:windowWidth/3,backgroundColor:'white'} 
})
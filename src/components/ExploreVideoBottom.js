import React from 'react'
import {View, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native'
import {VideosContext} from '../contexts/VideosContext.js';
import Video from 'react-native-video-player';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ExplorVideoBottom = props => {
    let vidContext = React.useContext(VideosContext);
    return (
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {vidContext.videos.map((val,index)=>{
                return (
                    // <View style={{height:150,width:windowWidth/3,index==0?backgroundColor:'pink':backgroundColor:'red'}}>
                    <View key={index}  style={index%2==0? styles.layoutA:styles.layoutB}>
                        <TouchableOpacity onPress={()=>props.clicked(val.videoUrl)} >
                        <Image
                            source={val.videoUrl}
                            style={{height:"100%",width:"100%"}}
                        />
                        </TouchableOpacity>
                        
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    layoutA :{height:150,width:windowWidth/3,backgroundColor:'black'},
    layoutB:{height:150,width:windowWidth/3,backgroundColor:'white'} 
})
export default ExplorVideoBottom;
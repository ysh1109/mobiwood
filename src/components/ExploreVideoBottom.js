import React from 'react'
import {View, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList} from 'react-native'
import {VideosContext} from '../contexts/VideosContext.js';
import Video from 'react-native-video-player';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ExplorVideoBottom = props => {
    let vidContext = React.useContext(VideosContext);
    return (
       
            <FlatList 
                data={vidContext.videos.reverse()}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>(
                    <View key={index}  style={styles.layoutB}>
                        <TouchableOpacity onPress={()=>props.clicked(item.videoUrl,item.thumbnail)} >
                        <Image
                            source={item.thumbnail?{uri:item.thumbnail}:(require('../assets/images/play.png'))}
                            style={{height:"100%",width:"100%"}}
                        />
                        </TouchableOpacity>
                        
                    </View>)
                }
            />
    )
}

const styles = StyleSheet.create({
    layoutA :{height:150,width:windowWidth/3,backgroundColor:'black'},
    layoutB:{height:150,width:windowWidth/3,backgroundColor:'white'} 
})
export default ExplorVideoBottom;
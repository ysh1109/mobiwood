import React from 'react'
import {View,StyleSheet,Dimensions,Text,Image, TouchableOpacity} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ExplorVideoBottom = (props) => {
    return (
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>

        {props.video.map((value,index)=>{
            return (
                // <View style={{height:150,width:windowWidth/3,index==0?backgroundColor:'pink':backgroundColor:'red'}}>
                <View  style={index%2==0? styles.layoutA:styles.layoutB}>
                    <TouchableOpacity onPress={()=>props.clicked(index)} >
                    <Image
                        style={{height:"100%",width:"100%"}}
                        source={value.img}
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
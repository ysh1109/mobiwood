
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import HeaderIcon from '../../HOC/HeaderIcon.js';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const UploadScreen = (props) => {
    const [filePath, setFilePath] = useState({});
    const chooseFile = () => {
        let options = {
            title: 'Video Picker', 
            mediaType: 'video', 
          
            storageOptions:{
              skipBackup:true,
              path:'images'
            },
            
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log(
              'User tapped custom button: ',
              response.customButton
            );
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = {
            //   uri: 'data:image/jpeg;base64,' + response.data
            // };
            setFilePath(source);
          }
        });
      };

    return(
        <View style={{flex:1}}>
            <Text style={{textAlign:'center',fontSize:24,padding:20}}>Upload Screen</Text>
            {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
            style={styles.imageStyle}
            /> */}
            {/* <Image
            source={{uri: filePath.uri}}
            style={styles.imageStyle}
            /> */}
            
            {filePath.uri&&
              <>
              {/* <VideoPlayer
                source={{url:`${filePath.uri}`}}
                thumbnail={{uri: 'data:image/jpeg;base64,' + filePath.data,}}
              /> */}
              <Video source={{uri: `${filePath.uri}`}}   // Can be a URL or a local file.
              shouldPlay={false}
              controls={true}
              resizeMode="cover"
              style={{height:300,width:windowWidth-50,alignSelf:'center'}} />
              {/* <Text style={styles.textStyle}>
                {filePath.uri}
              </Text> */}
              </>
            }
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <TouchableOpacity style={{backgroundColor:'black',width:100,alignSelf:'center',borderRadius:10,marginTop:20}} onPress={chooseFile}>
                <Text style={{color:'white',textAlign:'center',padding:20}}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'black',width:100,alignSelf:'center',borderRadius:10,marginTop:20}}>
                <Text style={{color:'white',textAlign:'center',padding:20}}>Submit</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles  = StyleSheet.create ({
   
      textStyle: {
        padding: 10,
        color: 'black',
      },
      buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
      },
    
})

export default HeaderIcon(UploadScreen);
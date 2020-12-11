
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image} from 'react-native';
import HeaderIcon from '../../HOC/HeaderIcon.js';
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player';


const UploadScreen = (props) => {
    const [filePath, setFilePath] = useState({});
    const chooseFile = () => {
        let options = {
            title: 'Video Picker', 
            mediaType: 'video', 
            storageOptions:{
              skipBackup:true,
              path:'images'
            }
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
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{textAlign:'center'}}>Upload Screen</Text>
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
              <VideoPlayer
                source={{url:`${filePath.uri}`}}
                thumbnail={{uri: 'data:image/jpeg;base64,' + filePath.data,}}
              />
              <Text style={styles.textStyle}>
                {filePath.uri}
              </Text>
              </>
            }
            
            <TouchableOpacity onPress={chooseFile}><Text>Upload</Text></TouchableOpacity>
        </View>
    )
}

const styles  = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
      },
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
      imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
      },
})

export default HeaderIcon(UploadScreen);
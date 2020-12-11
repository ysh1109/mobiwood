
import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import HeaderIcon from '../../HOC/HeaderIcon.js';
import ImagePicker from 'react-native-image-picker';

const UploadScreen = (props) => {

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
            <Text style={{textAlign:'center'}}>Upload UploadScreen</Text>
            <TouchableOpacity onPress={chooseFile}><Text>upload</Text></TouchableOpacity>
        </View>
    )
}

const styles  = StyleSheet.create ({

})

export default HeaderIcon(UploadScreen);
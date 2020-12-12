
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import HeaderIcon from '../../HOC/HeaderIcon.js';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player';
import InputField from '../../components/InputField';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const UploadScreen = (props) => {
    const [filePath, setFilePath] = useState({});
    const [desc,setDesc] = useState({})
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
    const handleTextChange =(e) => {
      setDesc(e)
      console.warn(e)
    }
     const removeFile = () => {
       setFilePath({})
     }

    return(
        <View style={{flex:1}}>
            
            <View style={styles.uploadView}>
            <Text style={{textAlign:'center',fontSize:24,padding:20}}>Upload A Video</Text>
              {filePath.uri&&
                <>
                <Video source={{uri: `${filePath.uri}`}}   // Can be a URL or a local file.
                shouldPlay={false}
                controls={true}
                resizeMode="cover"
                style={{height:windowHeight/2.5,width:windowWidth-50,alignSelf:'center'}} />
                </>
                }
            </View>

            <View style={{alignSelf:'center',marginTop:15}}>
            <Text style={styles.label}>Description</Text>
            <InputField
                  placeholderTextColor="#a0aec0"
                  onChangeText= {e=>{handleTextChange(e)}}                  //onBlur={handleBlur('email')}
                  value={desc}
                 containerStyles={styles.containerStyles}
                />
            </View>    
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <TouchableOpacity style={styles.buttons} onPress={chooseFile}>
                <Text style={styles.btnText}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                  onPress={removeFile}>
                <Text style={styles.btnText}>Remove</Text>
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
      uploadView: {
        marginTop:50,
        height:windowHeight/2.5,
        width:windowWidth-50,
        backgroundColor:'white',
        alignSelf:'center',
        borderWidth:1,
        borderColor:'black',
        elevation:10
      },
      buttons: {
        backgroundColor:'black',
        width:100,
        alignSelf:'center',
        borderRadius:10,
        marginTop:20
      },
      btnText :{
        color:'white',
        textAlign:'center',
        padding:20
      },
     label:{
       fontSize:18,
       fontWeight:'700',
       marginBottom:10
     }
      
    
})

export default HeaderIcon(UploadScreen);
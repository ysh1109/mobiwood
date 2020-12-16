
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions,ScrollView} from 'react-native';
import HeaderIcon from '../../HOC/HeaderIcon.js';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player';
import InputField from '../../components/InputField';
import DropDownPicker from 'react-native-dropdown-picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const UploadScreen = (props) => {
    const [filePath, setFilePath] = useState({});
    const [talent,setTalent] = useState("Acting");
    const [socialMedia,setSocialMedia] = useState("")
    const [follower,setFollower] = useState("")
    const [desc,setDesc] = useState("")
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
    const handleTextChange =(e,type) => {
      switch(type) {
        case 'desc' : {
          setDesc(e)
          break;
        }
        case 'social' : {
          setSocialMedia(e)
          break;
        }
        case 'follower' : {
          setFollower(e)
          break;
        }
        default : {

        }
      }
    }
     const removeFile = () => {
       setFilePath({})
     }
     const uploadVideo = () => {
        if(desc== "" || follower==""||socialMedia=="") {
         
        }
     }

    return(
        <ScrollView style={{flex:1}}>
            
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

            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <TouchableOpacity style={styles.buttons} onPress={chooseFile}>
                <Text style={styles.btnText}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                  onPress={removeFile}>
                <Text style={styles.btnText}>Remove</Text>
                </TouchableOpacity>
            </View>

            <View style={{alignSelf:'center',marginTop:15}}>

             <Text style={styles.label}>Talent</Text>
            
              <View style={{height:50}}>
                <DropDownPicker
                    items={[
                      {value: 'Acting', label: 'Acting'},
                      {value: 'Singing', label: 'Singing'},
                      {value: 'Dancing', label: 'Dancing'},
                      {value: 'Comedy', label: 'Comedy'},
                      {value: 'Music', label: 'Music'},
                      {value: 'Magic', label: 'Magic'},
                      {value: 'Aerobatics', label: 'Aerobatics'},
                      {value: 'Others', label: 'Others'},
                    ]}
                    defaultValue={talent}
                    containerStyle={{height:50}}
                    style={styles.picker}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={(item) => {
                      setTalent(item.label);
                    }}
                  />
              </View>
          
              
            <Text style={[styles.label,{marginTop:20}]}>Write Something About The Video</Text>
            <InputField
                  placeholderTextColor="#a0aec0"
                  onChangeText= {e=>{handleTextChange(e,"desc")}}                  //onBlur={handleBlur('email')}
                  value={desc}
                 containerStyles={styles.containerStyles}
                />

            <Text style={[styles.label,{marginTop:20}]}>Social Media With Highest Followers</Text>
             <InputField
                  placeholderTextColor="#a0aec0"
                  onChangeText= {e=>{handleTextChange(e,"social")}}                  //onBlur={handleBlur('email')}
                   value={socialMedia}
                 containerStyles={styles.containerStyles}
                />
             <Text style={[styles.label,{marginTop:20}]}>Follower Count On The platform</Text>
              <InputField
                  placeholderTextColor="#a0aec0"
                  onChangeText= {e=>{handleTextChange(e,"follower")}}                  //onBlur={handleBlur('email')}
                  value={follower}
                 containerStyles={styles.containerStyles}
                />
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            
                <TouchableOpacity style={styles.buttons} onPress={()=>uploadVideo()}>
                <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
               
            </View>

            </View>    
            
            
        </ScrollView>
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
     },
     picker:{
      backgroundColor: 'white',
      borderColor:"#edf2f7",
      borderRadius:3,
    }
      
    
})

export default HeaderIcon(UploadScreen);
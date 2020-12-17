
import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions,ScrollView} from 'react-native';
//import HeaderIcon from '../../HOC/HeaderIcon.js';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player';
import InputField from '../../components/InputField';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FeatherIcon from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const UploadScreen = (props) => {
    const [filePath, setFilePath] = useState({});
    const [talent,setTalent] = useState(" ");
    const [title, setTitle] = useState('');
    const [socialMedia,setSocialMedia] = useState("")
    const [follower,setFollower] = useState("")
    const [desc,setDesc] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);
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
        case 'title':{
          setTitle(e)
          break;
        }
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

    const validations = () => {
       if(desc== "" || follower==""||socialMedia=="") {
        return false;
      }
      else {
        return true;
      }
     
    }

    const uploadVideo = () => {
     
      if(validations())
      {
        // if (!auth.currentUser) {
        //   alert("You need to login first");
        //   navigate("/contest");
        // }
        // var vid = localStorage.getItem("");
        let vid = new Date().getTime()+"_"+parseInt(Math.random()*10000)
        let metadata = {
          contentType: "video/quicktime",
        };
        alert(`filePath : ${filePath}`)
        let uploadTask = storage()
          .ref()
          .child("users/" + vid)
          .put(filePath.uri, metadata);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadPercent(progress);
            console.log("Upload is " + progress + "% done");
          },
          (err) => {
            console.log(err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              var data = {
                videoUrl: downloadURL,
                talent: talent,
                description: desc,
                title: title,
                socialMedia: socialMedia,
                followerCount: follower,
                 groupCheck: Selection?"yes":"no",
                otherTalent: talent === "others" ? otherTalent : "none",
                uploadTime: new Date(),
                thumbnail: null,
              };
              firestore()
                .collection("user")
                .doc(auth.currentUser.uid)
                .collection("videos")
                .doc(vid)
                .set(data, { merge: true })
                .then(() => {
                  data.userid = auth.currentUser.uid;
                  firestore()
                    .collection("contest")
                    .doc(vid)
                    .set(data)
                    .then(() => {
                      // navigate("/");
                      alert(`uploading done`)
                    });
                });
            });
          }
        );
      }
    }

    return(
        <ScrollView style={{flex:1}}>
            
            
            <View style={styles.uploadView}>
            <Text style={{textAlign:'center',fontSize:24,padding:20, display:'none'}}>Upload A Video</Text>
              {filePath.uri&&
                <>
                <Video source={{uri: `${filePath.uri}`}}   // Can be a URL or a local file.
                shouldPlay={false}
                controls={true}
                resizeMode="cover"
                style={{height:windowHeight/2,width:windowWidth-0,alignSelf:'center'}} />
                </>
                }
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            {!filePath.uri ? ( 
              <TouchableOpacity style={{position:'absolute',zIndex:99999, top:-220, left:0, width:"100%"}} onPress={chooseFile}>
              <Text style={{width:200, height:100, color:'grey', width:'100%', textAlign:'center'}}>
                <FeatherIcon name="film" size={40} color="grey" style={{marginBottom:100}} />
                </Text>
                <Text style={{color:'grey',fontWeight:'400',position:'absolute', width:'100%', textAlign:'center', marginTop:28}}>{'\n'}Click to Select Video</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={removeFile}>
                <Text style={{backgroundColor:'rgba(0,0,0,0.8)', color:'white', padding:10, borderRadius:5, marginTop:10 }}><FeatherIcon name="x" size={13} color="white" style={{marginTop:20, position:'absolute', top:3}} /> Remove</Text>
                </TouchableOpacity>
            )}
              
                
                
            </View>

            <View style={{alignSelf:'center',marginTop:15}}>

             <Text style={styles.label}>Talent</Text>
            
              <View style={{height:50}}>
                <DropDownPicker
                    items={[
                      {value: ' ', label: '-Select-'},
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

            <Text style={[styles.label,{marginTop:20}]}>Title</Text>
            <InputField
                  placeholderTextColor="#a0aec0"
                  onChangeText= {e=>{handleTextChange(e,"title")}}                  //onBlur={handleBlur('email')}
                  value={title}
                 containerStyles={styles.containerStyles}
            />
              
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

              <View style={styles.checkboxContainer}>
              <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={{marginTop:28}}>Are you participating as a group?</Text>
      </View>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            
                <TouchableOpacity style={styles.buttons} onPress={()=>uploadVideo()}>
                <Text style={styles.btnText}>Upload Video</Text>
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
        marginTop:0,
        height:windowHeight/2,
        width:windowWidth-0,
        backgroundColor:'black',
        alignSelf:'center',
        borderWidth:0,
        borderColor:'#efefef',
        elevation:0,
      },
      buttons: {
        backgroundColor:'black',
        alignSelf:'center',
        borderRadius:10,
        marginBottom:30,
        zIndex:9999,
        width:350
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
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
      marginTop:20
    },
    label: {
      margin: 8,
    },
      
    
})

export default UploadScreen;
import React,{useState} from 'react'
import {Text, View, Share,Modal,Dimensions,TouchableOpacity, ToastAndroid} from 'react-native'
import HeaderIcon from '../../HOC/HeaderIcon.js';
import { ScaledSheet } from 'react-native-size-matters';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {Colors, Typography} from '../../constants';
import ImageGrid from '../../components/ImageGrid'
import RadioButtonRN from 'radio-buttons-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const data = [
  {
    label: 'Spam/Misleading'
   },
   {
    label: 'Abusive'
   },
   {
    label: 'Harmful'
   },
   {
    label: 'Illegal'
   },
   {
    label: 'Inappropriate'
   },
   {
    label: 'Copyright Infringement'
   }
  ];

const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

export default HeaderIcon(function HomeScreen(){
    const [modalVisible,setModalVisible] = useState(false)
    const [reportValue,setReportValue] = useState("")
    const toggleModal = (val) =>{
        setModalVisible(val)
        //getData()
    }
    const handleReport = () => {
      setModalVisible(false)
      if(reportValue != ""){
       ToastAndroid.show("Report has been Submitted", ToastAndroid.LONG);

      }
    }
    return(
          <View style={{flex:1}}>
               <Modal
            animationType="slide"
            transparent={true}
            // style={{}}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
            }}
          >
            <View style={{justifyContent:'flex-end',flex:1, backgroundColor:'white'}}>
                <View style={styles.centeredView}>
                  <Text style={{fontSize:24,textAlign:'center',margin:15,fontWeight:'700',color:'black'}}>Report Content</Text>
                <RadioButtonRN
                    data={data}
                    style={{width:'90%',alignSelf:'center'}}
                    selectedBtn={(e) => setReportValue(e)}
                  />
                <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:25}}>
                  <TouchableOpacity onPress={()=>setModalVisible(false)} style={{justifyContent:'center'}}>
                      <Text style={{fontSize:18,fontWeight:'700',color:'red', borderColor:'red', borderWidth:1, padding:10}}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>handleReport()}>
                    <Text style={{fontSize:18,fontWeight:'700',color:'skyblue'}}>OK</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
            </View>
            
          </Modal>
          <View style={styles.releaseCont}>
            <ImageGrid reportModal = {()=>toggleModal(true)} shareModal={onShare} />
          </View>
          </View>
    )
})

const styles = ScaledSheet.create({
    container:{
    },
    releaseCont:{flex:1},
    searchContainer:{
        flexDirection:"row",
        backgroundColor:"#edf2f7",
        borderRadius:"7@ms",
        width:wp('85%'),
    },
    icon:{
        marginTop:"12@ms"
    },
    containerStyles:{
        width:wp('75%'),
        backgroundColor:"#edf2f7",
    },
    trendingSearch:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginBottom:"10@ms"
    },
    trendingName:{
        fontSize:"12@s",
        color:"#1a202c"
    },
    btn:{
        backgroundColor:"black",
        justifyContent:"center",
        flexDirection:"row",
        padding:"8@ms",
      },
      btnText:{
        fontSize: '12@s',
        color: "#f7fafc",
        alignSelf: 'center',
        marginLeft:"5@ms"
      },
      modalContent: {
        backgroundColor: 'white',
        width: wp('95%'),
        alignSelf:"center",
        top:"10@ms",
        borderRadius: "7@ms",
        padding:"15@ms",
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
      },
      modalContainer:{
          padding:"10@ms",
          height:wp('0%')
      },
      heading: {
        ...Typography.FONT_BOLD,
        fontSize: '28@s',
        color: Colors.SECONDARY,
        marginBottom:"28@ms"
      },
      modalHeading:{
          flexDirection:"row",
          justifyContent:"space-between",
      },
      categoryCont:{
          padding:"30@ms",
      },
      catTxt:{fontSize:"16@s"},
      category:{
          borderWidth:1,
          alignItems:"center",
          borderRadius:"7@ms",
          marginBottom:"12@ms",
          padding:"10@ms",
      },
      gridContainer:{
          paddingTop:"25@ms"
      },
      centeredView: {
        height:windowHeight/1.3,
        width:windowWidth,
        borderRadius:20,
        // justifyContent:'center',
        alignSelf:'center',
        // alignItems: "center",
        backgroundColor: "white",
        // padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      
      
})
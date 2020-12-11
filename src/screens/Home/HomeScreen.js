import React,{useState} from 'react'
import {Text,View,Modal} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderIcon from '../../HOC/HeaderIcon.js';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {Colors, Typography} from '../../constants';
import Slider from '../../components/Slider'
import ImageGrid from '../../components/ImageGrid'

const TrendingName = ({name}) =>{
    return(
        <View>
            <Text style={styles.trendingName}>{name}</Text>
        </View>
    )
}

const Category = ({name}) => {
    return(
        <View style={styles.category}>
            <Text style={styles.catTxt}>{name}</Text>
        </View>
    );
}


export default HeaderIcon(function HomeScreen(){
    const [modalVisible,setModalVisible] = useState(false)
    const toggleModal = (val) =>{
        setModalVisible(val)
        //getData()
    }
    return(
        <ScrollView  showsVerticalScrollIndicator={false}>
           <View style={styles.container}>
            <View style={styles.searchContainer}>
            <InputField 
                placeholder="Search"
                placeholderTextColor = "#1a202c"
                //  onChangeText={handleChange('username')}
                //  onBlur={handleBlur('username')}
                //  value={values.username}
                  containerStyles = {styles.containerStyles}
            />
            <TouchableOpacity  style={styles.icon}>
                <Icon name="search-outline" size={22} color="#1a202c"/>
            </TouchableOpacity>
            </View>
            <View style={styles.trendingSearch}>
                <Icon name="trending-up" size={18}/>
                 <Text style={styles.trendingName}> Trending Searches: </Text>
                <TrendingName name = "Shushant Singh Rajput, "/>
                <TrendingName name = "Sidharth Shukla, "/>
                <TrendingName name="Rashmi Desai, "/>
                <TrendingName name="Asim Riaz, "/>
                <TrendingName name="Himanshi Khurana, "/>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => toggleModal(true)}>
                <Icon name="menu-outline" size={18} color="#f7fafc"/>
                <Text style={styles.btnText}>All Categories</Text>
            </TouchableOpacity>

            <Modal  animationType="slide" transparent={true}
                    visible={modalVisible}
                    onRequestClose={() =>  toggleModal(false) }
                    
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalHeading}>
                            <Text style={styles.heading}>Categories</Text>
                            <Icon.Button
                              name="close-outline"
                              size={25}
                              color="black"
                              backgroundColor="white"
                              onPress={() => toggleModal(false)}
                            />
                    </View>  
                    <View style={styles.categoryCont}>
                        <Category name="Acting" />
                        <Category name="Singing"/>
                        <Category name="Dancing"/>
                        <Category name="Comedy"/>
                        <Category name="Music"/>
                        <Category name="Magic"/>
                        <Category name="Acrobatics"/>
                        <Category name="Others"/>
                    </View>                    
                </View>
            </Modal>
            </View>
           
           <Slider />
           <View style={styles.releaseCont}>
            <View style={styles.gridContainer}>
                <Text style={styles.heading}>New Releases</Text>
                <ImageGrid/>
            </View>
            <View style={styles.gridContainer}>
                <Text style={styles.heading}>Discover</Text>
                <ImageGrid/>
            </View>
            <Text style={{marginBottom:18}}></Text>
            </View>
        </ScrollView>
    )
})

const styles = ScaledSheet.create({
    container:{
        padding:"20@ms",
    },
    releaseCont:{paddingHorizontal:"20@ms"},
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
      
})
import React, {useState, useCallback, useEffect} from 'react';
import {LayoutAnimation, View, Image, Text} from 'react-native';
import FloatingLabelInput from 'react-native-floating-label-input';
import {s, ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Colors} from '../constants';
import {TextInput} from 'react-native-gesture-handler';

const InputField = ({leftIcon, floatingInput = true, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    LayoutAnimation.spring();
    setIsFocused(true);
  }, [LayoutAnimation]);

  const handleBlur = useCallback(() => {
    if (props.value === '' || props.value == null) {
      LayoutAnimation.spring();
      setIsFocused(false);
    }
  }, [props, LayoutAnimation]);

  useEffect(() => {
    if (props.value) {
      setIsFocused(true);
    }
    return () => {
      setIsFocused(false);
    };
  }, [props.value]);

  return (
<<<<<<< HEAD
    <View style={{...Styles.container, ...props.inputContainerStyles}}>
      {/* {leftIcon && <Image style={props.iconStyles} source={leftIcon} />} */}
      <TextInput  keyboardType="decimal-pad"
              style={Styles.numberInput}
              underlineColorAndroid="transparent"
              {...props}/>
      {/* {floatingInput ? (
        <FloatingLabelInput
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          // isFocused={isFocused}
          containerStyles={{
            ...Styles.inputContainer,
            
            ...props.containerStyles,
          }}
          labelStyles={{
            ...Styles.inputLabel,
            ...{
              fontSize: isFocused ? s(10.25) : s(13.75),
            },
          }}
          inputStyles={{...Styles.input, ...props.inputStyles}}
        />
      ) : (
        <View style={{width: '80%'}}>
          <View style={Styles.numberInputContainer}>
            <Text style={Styles.numberText}>$</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={Styles.numberInput}
=======
  
        <View style={{width: '100%'}}>
            <TextInput 
              style={Styles.inputContainer}
>>>>>>> 542108c1ded8e5f61d64021b4c5cbf4a0d624053
              underlineColorAndroid="transparent"
              {...props}/>
        </View>
<<<<<<< HEAD
      )} */}
    </View>
=======
   
>>>>>>> 542108c1ded8e5f61d64021b4c5cbf4a0d624053
  );
};

const Styles= ScaledSheet.create({
  inputContainer:{
    borderColor: '#edf2f7',
    borderWidth: 1,
    borderRadius:"3@ms",
    paddingLeft:10,
    width:wp('90%'),
    backgroundColor:"white",
  },
  numberInput : {
    backgroundColor:'white',
    width:'100%'
  }
})

export default InputField;

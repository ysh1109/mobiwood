import React from 'react';
import {View, Text} from 'react-native';
import {UserContext} from '../../contexts/UserContext.js';

export default props => {
    let userCont = React.useContext(UserContext);
    return (
        <View style={{flex:1}}>
            <Text>Followers : {userCont.followers}</Text>
            <Text>HELLO WORLD!</Text>
        </View>
    )
};
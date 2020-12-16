import React from 'react';
import {View, Text} from 'react-native';
import {UserContext} from '../../contexts/UserContext.js';
import {AuthContext} from "../../contexts/AuthContext.js";


export default props => {
    let userCont = React.useContext(UserContext);
    const { userDetails, uid } = React.useContext(AuthContext);
    React.useEffect(()=>{
        // userCont.updateFollowers();
    },[])
    return (
        <View style={{flex:1}}>
            {userCont?
                <>
                <Text>{userDetails.providerData[0].displayName}</Text>
                <Text>{userCont.followers} Followers </Text>
                <Text>{userCont.following} Following  </Text>
                </>
                :
                <View>
                    <Text>HELLO</Text>
                </View>
            }
        </View>

    )
};
import 'react-native-gesture-handler';
import HomeScreen from './screens/Home/HomeScreen'
import UploadScreen from './screens/Upload/UploadScreen.js';
import ExploreScreen from './screens/Explore/Explore.js';
import style from './screens/onboarding/style';
import React, {useEffect, Fragment} from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './contexts/AuthContext';
import {AppNavigator} from './navigations';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import VideosContext from './contexts/VideosContext.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {UnauthorizedStack} from './navigations/UnauthorizedStack';
// import VideosContext from './contexts/VideosContext.js';
import DrawerStack from './navigations/DrawerStack';
import { FONT_BOLD } from './constants/typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
function SettingsScreen() {
  return (
    <View style={{flex: 1,  padding:50, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const onAuthStateChanged = (u) => {
    setIsSignedIn(u && u.uid);
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
      <VideosContext>
        <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } 
            else if (route.name === 'Notification') {
              iconName = focused ? 'bell' : 'bell';
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }
            else if (route.name === 'Upload') {
              iconName = focused ? 'upload' : 'upload';
            }
            else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search';
            }
            // You can return any component that you like here!
            return <FeatherIcon name={iconName} size={size} color={color} style={{marginBottom:-5}} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          labelStyle: {
              margin:4
          },
          backgroundColor: 'black',
          style:{
            backgroundColor: 'black',
            height:65
          }
        }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={ExploreScreen} />
          <Tab.Screen name="Upload" component={UploadScreen} />
          <Tab.Screen name="Notification" component={SettingsScreen} />
          <Tab.Screen name="Profile" component={isSignedIn?DrawerStack:UnauthorizedStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </VideosContext>
  );
};

export {App};

import React, { useState, createContext, useContext, useEffect } from "react";
import {AuthContext} from "./AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { firestore } from "../firebase.config";
import firestore from '@react-native-firebase/firestore';

import { VideosContext } from "./VideosContext";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [myVideos, setMyVideos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const { userDetails, uid } = useContext(AuthContext);
  // const { videos } = useContext(VideosContext);

  useEffect(() => {
    // alert(`a : ${JSON.stringify(userDetails)}`)
    if (userDetails) {
      setLikedVideos(userDetails.likedVideos || []);
      setFollowers(userDetails.followers || []);
      setFollowing(userDetails.following || []);
    }
  }, [userDetails]);

  useEffect(() => {
    // const videosFromSession = JSON.parse(sessionStorage.getItem("videos"));
    // AsyncStorage.getItem("videos").then(resp => {
      // alert(`${uid}`)
      const fetchMyVideos = async () => {
        //   const db = firestore();
          const collectionRef = firestore().collection("user").doc(uid).collection("videos");
          const vids = await collectionRef.get();
          let vidArray = [];
          vids.forEach((vid) => {
            if (vid.data().videoUrl) {
              console.log(`vid : ${JSON.stringify(vid.data())}`)
              // alert(`vid : ${JSON.stringify(vid)}`)
              // const temp = resp.filter(
              //   (currVid) => currVid.videoUrl === vid.data().videoUrl
              // );
              vidArray.push(vid.data());
              
            }
            setMyVideos(vidArray);
          });
        };
        // if (uid && videosFromSession) {
          fetchMyVideos();
        // }
    // });
    // (sessionStorage.getItem("videos"));

    
  }, [uid]);

  const updateLikes = async (videoId, action) => {
    let newLikes;
    if (action === "like") {
      newLikes = [...likedVideos, videoId];
    } else {
      newLikes = likedVideos.filter((vid) => vid !== videoId);
    }
    setLikedVideos(newLikes);
    await firestore().collection("user").doc(uid).update({
      likedVideos: newLikes,
    });
  };

  const updateFollowers = async (action, userId) => {
    let newFollowers = followers;
    if (action === "follow") {
      setFollowers([...followers, userId]);
      newFollowers = [...newFollowers, userId];
    } else {
      if (followers && followers.length) {
        newFollowers = followers.filter((follower) => follower !== userId);
        setFollowers(newFollowers);
      } else {
        setFollowers([]);
        newFollowers = [];
      }
    }
    await firestore().collection("user").doc(userId).update({
      followers: newFollowers,
    });
  };

  const updateFollowing = async (action, userId) => {
    let newFollowing = following;
    if (action === "follow") {
      setFollowing([...following, userId]);
      newFollowing = [...newFollowing, userId];
    } else {
      if (following && following.length) {
        newFollowing = following.filter((follower) => follower !== userId);
        setFollowing(newFollowing);
      } else {
        setFollowing([]);
        newFollowing = [];
      }
    }
    await firestore().collection("user").doc(uid).update({
      following: newFollowing,
    });
  };

  return (
    <UserContext.Provider
      value={{
        likedVideos:likedVideos,
        updateLikes:updateLikes,
        myVideos:myVideos,
        followers:followers,
        updateFollowers:updateFollowers,
        following:following,
        updateFollowing:updateFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

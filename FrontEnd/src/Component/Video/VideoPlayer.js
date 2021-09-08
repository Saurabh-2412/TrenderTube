import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import "../../App.css";

import { useAuth } from "../../Contexter/AuthContext";
import { useVideoContext } from "../../Contexter/videoContext";
import { useLikedVideoContext } from "../../Contexter/likedVideosContext";
import { useWatchListContext } from "../../Contexter/watchListContext";
import { usePlaylist } from "../../Contexter/playListContext";
import { Toaster } from "../Utils/Toaster";
import { PlaylistModal } from "../PlayList/PlaylistModal";
import data from "../../Data/Data";

export const VideoPlayer = () => {
  const { id } = useParams();
  const [ suggestedId, setSuggestedId ] = useState(id);
  const [ getVideos,setVideos ] = useState([]);
  const { history, dispatchgeneral } = useVideoContext();
  const { likeList, dispatchlike } = useLikedVideoContext();
  const { watchList, dispatchwatchlist } = useWatchListContext();
  const { dispatchplaylist } = usePlaylist();
  const { token } = useAuth();
  
  const VideoData = data.find((videItem) => videItem.videoId === suggestedId);
  const inLikeList = likeList.some((video) => video.videoId === suggestedId);

  axios.interceptors.request.use(
    config => {
      config.headers.authorization = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  useEffect(() => {
    (async function () {
      try{
        const { data } = await axios.get(
          "https://VideoLibraryData.saurabhsharma11.repl.co/v1/recentlyPlayedVideos"
        );
          dispatchgeneral({ type: "LOADING_HISTORY", payload: data.foundRecentlyPlayedVideos });
        }
      catch{

      }
    })();
  },[dispatchgeneral]);

  async function historyHandler(item){
    if(history.find((video) => video.videoId === item.videoId)){
      setSuggestedId(item.videoId)
    } else {
      const { data } = await axios.post(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/recentlyPlayedVideos",{item}
      );
      setSuggestedId(item.videoId)
      dispatchgeneral({ type: "ADD_TO_HISTORY", payload: data.savedVideo })
    }
  }

  //liked videos
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/likedVideos"
      );
      dispatchlike({ type: "INITIAL_LOAD", payload: data.foundLikedVideo });
    })();
  },[dispatchlike]);

  async function LikedVideos(item) {
    if(likeList.some((video) => video.videoId === item.videoId)) {
      try{
        const { data } = await axios.delete(
          `https://VideoLibraryData.saurabhsharma11.repl.co/v1/likedVideos/${item.videoId}`
        );
        dispatchlike({ type: "REMOVE_FROM_LIKED", payload: data.video });
        Toaster("Removed from liked videos");
      }
      catch(err){
        console.log(err);
      }
    } else {
      try{
        const { data } = await axios.post(
          "https://VideoLibraryData.saurabhsharma11.repl.co/v1/likedVideos",{item}
        );
        dispatchlike({ type: "ADD_TO_LIKED", payload: data.savedVideo });
        Toaster("Added from liked videos");
      }
      catch(err){
        console.log(err);
      }
    }
  }

  //watch later videos
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/watchLater"
      );
      dispatchwatchlist({ type: "INITIAL_LOAD", payload: data.foundWatchLater });
    })();
  },[dispatchwatchlist]);

  async function WatchLaterVideos(item) {
    if (watchList.some((video) => video.videoId === item.videoId)) {
      Toaster("Already added to watch list");
    } else {
      try{
        const { data } = await axios.post(
          "https://VideoLibraryData.saurabhsharma11.repl.co/v1/watchLater",{item}
        );
        dispatchwatchlist({ type: "ADD_TO_WATCHLIST", payload: data.savedVideo });
        Toaster("Added to watch list");
      }
      catch(err){
        console.log(err);
      }
    }
  }

  //suggestedListner
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/videoData"
      );
      // const filteredData = data.videos.filter((video) => video.videoId !== id)
      // console.log("this is filteredData",filteredData);
      setVideos(data.videos);
    })();
  }, []);

  return (
    <div>
      <div className="videoPlayer">
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          controls
          playing={false}
          url={`https://www.youtube.com/watch?v=${suggestedId}`}
        />
      </div>
      <div className="videoPlayerText">
        <h2>#poetName : {VideoData.poetName}</h2>
        <h4>#topic : {VideoData.topic}</h4>
        <button onClick={() => LikedVideos(VideoData)}>{inLikeList?"Dislike":"Like"}</button>
        <button onClick={() => WatchLaterVideos(VideoData)}>WatchLater</button>
        <button onClick={() => dispatchplaylist({type: "SHOW_PLAYLIST_MODAL"})}>Playlist</button>
      </div>

      <PlaylistModal VideoData={VideoData}/>

      {/* Suggested List */}
      <h1 style={{ fontFamily: "italic", color: "orange", backgroundColor:"#41464b",margin:"0",border:"1px solid orange"}}>#suggestedList</h1>
      <div className="scrollmenu">
        <ul style={{ padding: "0px" }}>
          {getVideos.map(function (item) {
            return (
              <li key={item.videoId}>
                <br />
                <h3>#poetName : {item.poetName}</h3>
                <span style={{ color: "orange" }}>#topic : {item.topic}</span><br />
                <img
                  src={`https://img.youtube.com/vi/${item.videoImageId}/mqdefault.jpg`}
                  alt=""
                  onClick={() => historyHandler(item)}
                />
                <br />
              </li>
            );
          })}
        </ul>
      </div> 
    </div>
  );
};

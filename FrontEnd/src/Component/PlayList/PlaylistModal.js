import React,{ useEffect } from "react";
import { useAuth } from "../../Contexter/AuthContext";
import { usePlaylist } from "../../Contexter/playListContext";
import axios from "axios";
import "../../App.css";
import { PlaylistHeader } from "./PlaylistHeader";
import { CreatePlaylistInput } from "./CreatePlaylistInput";
import { CreatePlaylist } from "./CreatePlaylist";

export const PlaylistModal = ({ VideoData }) => {
  const { token } = useAuth();
  const {
    playList,
    showPlaylistModal,
    dispatchplaylist,
  } = usePlaylist();
  
  //loading playlist
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
      const { data } = await axios.get(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/playlistVideos"
      );
      //console.log("initial load",data)
      dispatchplaylist({ type: "INITIAL_LOAD", payload: data.playlist });
    })();
  },[dispatchplaylist]);

  async function handlePlaylistCheckbox(e,item) {
    //let listId = e.target.id;
    if (e.target.checked === true) {
      const { data } = await axios.post(
        `https://VideoLibraryData.saurabhsharma11.repl.co/v1/playlistVideos/${item._id}`,
        {playlistVideoItem:VideoData.videoId,action:"push"});
      dispatchplaylist({type: "SAVE_TO_PLAYLIST",payload: data.updatedPlaylist});
      //dispatchplaylist({ type: "SHOW_PLAYLIST_MODAL" })
    } else {
      const { data } = await axios.post(
        `https://VideoLibraryData.saurabhsharma11.repl.co/v1/playlistVideos/${item._id}`,
        {playlistVideoItem:VideoData.videoId,action:"pull"});
      dispatchplaylist({type: "REMOVE_FROM_PLAYLIST", payload: data.updatedPlaylist});
      //dispatchplaylist({ type: "SHOW_PLAYLIST_MODAL" })
    }
  };

  return (
    <div className={`modal ${showPlaylistModal.status === false ? "modal-hide" : "modal-show"}`}>
      <div className="modal--window">
        {/** playlist header */}
        <PlaylistHeader/>
          
        <div className="modal--content">
          {/** playlist creation */}
          <CreatePlaylist/>

          {/** playlist checkbox */}
          {playList.map((item) => {
            return (
              <div>
                <div key={item._id} className="playlist-names">
                    <input
                      type="checkbox"
                      name="playlist-item"
                      className="playlist-checkbox"
                      id={item._id}
                      checked={
                        item.playlistvideo.some(
                          (playlistVideo) => playlistVideo === VideoData.videoId
                        )
                          ? true
                          : false
                      }
                      onChange={(e) => handlePlaylistCheckbox(e,item)}
                    />
                    <label htmlFor={item._id}>{item.playlistName}</label>
                </div>
              </div>
            );
          })}
        </div>
          
        {/** Naming playlist */}
        <CreatePlaylistInput/>

      </div>
    </div>
  );
};
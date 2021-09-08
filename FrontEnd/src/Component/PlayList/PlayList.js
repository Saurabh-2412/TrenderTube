import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { usePlaylist } from "../../Contexter/playListContext";
import { useAuth } from "../../Contexter/AuthContext";

export function PlayList(){
    const { playList, dispatchplaylist} = usePlaylist();
    const { token } = useAuth();

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
        dispatchplaylist({ type: "INITIAL_LOAD", payload: data.playlist });
        })();
    },[dispatchplaylist]);

    async function DeleteHandler(playlistId){
        //console.log(playlistId)
        const { data } = await axios.delete(
            `https://VideoLibraryData.saurabhsharma11.repl.co/v1/playlistVideos/${playlistId}`
          );
        dispatchplaylist({ type:"DELETE_PLAYLIST",payload:data.playlist._id });
    }

    async function RemoveHandler(playListId,playListItem){
        const { data } = await axios.post(
            `https://VideoLibraryData.saurabhsharma11.repl.co/v1/playlistVideos/${playListId}`,
            {playlistVideoItem:playListItem,action:"pull"}
          );
        dispatchplaylist({type: "REMOVE_FROM_PLAYLIST", payload: data.updatedPlaylist});
    }

    return (
        <div>
            <h1>Playlist</h1>
            {playList.map((playListLister) => {
                return (
                    <div className="PlayList">
                        <h1>{playListLister.playlistName}</h1>
                        <div key={playListLister._id} className="PlayList-header">
                            <button onClick={() => DeleteHandler(playListLister._id)}>Delete Playlist</button>
                        </div><br/>
                        <ul style={{ padding: "0px" }}>
                            {playListLister.playlistvideo.map((playListItem) => (
                                <li key={playListItem} style={{ listStyleType: "none",display: "inline-block"}}>
                                    <div className="card-row">
                                        <div className="card">
                                            <NavLink to={`/videoplayer/${playListItem}`} className="link">
                                            <img
                                                src={`https://img.youtube.com/vi/${playListItem}/mqdefault.jpg`}
                                                alt=""
                                            />
                                            </NavLink>
                                            <div className="" style={{backgroundColor:"#41464b"}}>
                                                <button style={{margin:"15px 0px"}} onClick={() => RemoveHandler(playListLister._id,playListItem)}>Remove</button><br/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
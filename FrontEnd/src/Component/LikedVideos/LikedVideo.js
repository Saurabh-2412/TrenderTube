import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Toaster } from "../Utils/Toaster";
import { useAuth } from "../../Contexter/AuthContext";

import { useLikedVideoContext } from "../../Contexter/likedVideosContext";

export function LikedVideo() {
  const { likeList, dispatchlike } = useLikedVideoContext();
  const { token } = useAuth();

  axios.interceptors.request.use(
    config => {
      config.headers.authorization = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  //liked videos
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/likedVideos"
      );
      dispatchlike({ type: "INITIAL_LOAD", payload: data.foundLikedVideo });
    })();
  }, [dispatchlike]);

  async function Remove(itemId) {
    try{
      const { data } = await axios.delete(
        `https://VideoLibraryData.saurabhsharma11.repl.co/v1/likedVideos/${itemId}`
      );
      dispatchlike({ type: "REMOVE_FROM_LIKED", payload: data.video });
      Toaster("Removed from liked videos");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Liked Videos List</h1>
      <ul style={{ padding: "0px" }}>
        {likeList.map((item) => (
          <li key={item.videoId} style={{ listStyleType: "none",display: "inline-block"}}>
            <div className="card-row">
              <div className="card">
                <NavLink to={`/videoplayer/${item.videoId}`} className="link">
                  <img
                    src={`https://img.youtube.com/vi/${item.videoImageId}/mqdefault.jpg`}
                    alt=""
                  />
                </NavLink>
                <div className="" style={{backgroundColor:"#41464b"}}>
                  <h3 style={{margin:"0",color:"orange"}} className="">Poet Name : {item.poetName}</h3>
                  <span style={{fontWeight:"600",color:"orange"}}>#Topic : {item.topic}</span><br/><br/>
                  <button style={{marginBottom:"15px"}} className="" onClick={() => Remove(item.videoId)}>Remove</button><br/>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

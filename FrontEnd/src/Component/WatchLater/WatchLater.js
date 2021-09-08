import React,{useEffect} from "react";
import axios from "axios";
import { useWatchListContext } from "../../Contexter/watchListContext";
import { useAuth } from "../../Contexter/AuthContext";
import { NavLink } from "react-router-dom";
import { Toaster } from "../Utils/Toaster";

export function WatchLater() {
  const { watchList, dispatchwatchlist } = useWatchListContext();
  const { token } = useAuth();
  
  //watch later videos
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
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/watchLater"
      );
      dispatchwatchlist({ type: "INITIAL_LOAD", payload: data.foundWatchLater });
    })();
  },[dispatchwatchlist]);

  async function Remove(itemId) {
    try{
        axios.interceptors.request.use(
          config => {
            config.headers.authorization = token;
            return config;
          },
          error => {
            return Promise.reject(error);
          }
        )
        const { data } = await axios.delete(
          `https://VideoLibraryData.saurabhsharma11.repl.co/v1/watchLater/${itemId}`
        );
        dispatchwatchlist({ type: "REMOVE_FROM_WATCHLIST", payload: data.video });
        Toaster("Removed from watchlist");
      }
      catch(err){
        console.log(err);
      }
  }

  return (
    <div>
      <h1>WatchLater Listner</h1>
      <ul style={{ padding: "0px" }}>
        {watchList.map(function (item) {
          return (
            <li key={item.videoId} style={{listStyleType:"none",display: "inline-block"}}>
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
          );
        })}
      </ul>
    </div>
  );
}

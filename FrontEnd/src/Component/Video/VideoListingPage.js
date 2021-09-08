import React from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useVideoContext } from "../../Contexter/videoContext";
/* import { useLikedVideoContext } from "../../Contexter/likedVideosContext";
import { useWatchListContext } from "../../Contexter/watchListContext"; */

export function VideoListingPage() {
  const [videoList, setVideoList] = useState([]);
  const { history,dispatchgeneral } = useVideoContext();
  /* const { likeList, dispatchlike } = useLikedVideoContext();
  const { watchList, dispatchwatchlist } = useWatchListContext(); */

  async function RecentlyWatchedVideos(item) {
    if(history.find((video) => video.videoId === item.videoId)){
      
    } else {
      const { data } = await axios.post(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/recentlyPlayedVideos",{item}
      );
      dispatchgeneral({ type: "ADD_TO_HISTORY", payload: data.savedVideo });
    }
  }

  /* function LikedVideos(item) {
    //console.log("likedVideos", item);
    // if (likedVideosInList.some((video) => video.videoId === item.videoId)) {
    //   setLikedVideoInList([...likedVideosInList]);
    // } else {
    //   setLikedVideoInList([...likedVideosInList, item]);
    // }
    if (likeList.some((item) => item.id === item.videoId)) {
      dispatchlike({ type: "REMOVE_FROM_LIKED", payload: item.videoId });
    } else {
      dispatchlike({ type: "ADD_TO_LIKED", payload: item });
    }
  } */

  /* function WatchLaterVideos(item) {
    //console.log("watch later", item);
    if (watchList.some((video) => video.videoId === item.videoId)) {
      dispatchwatchlist({
        type: "REMOVE_FROM_WATCHLIST",
        payload: item.videoId,
      });
    } else {
      dispatchwatchlist({
        type: "ADD_TO_WATCHLIST",
        payload: item,
      });
    }
    //note : manage a state for button to enable and disable it
  } */

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://VideoLibraryData.saurabhsharma11.repl.co/v1/videoData"
      );
      setVideoList(data.videos);
    })();
  }, []);

  return (
    <div>
      <ul className="videoListingUL">
        {videoList.map(function (item) {
          return (
            <li key={item.videoId}>
              <NavLink to={`/videoplayer/${item.videoId}`} className="link">
                <img
                  src={`https://img.youtube.com/vi/${item.videoImageId}/mqdefault.jpg`}
                  alt=""
                  style={{ width: "21rem" }}
                  onClick={() => RecentlyWatchedVideos(item)}
                />
              </NavLink>
              <h3>#Poet Name : {item.poetName}</h3>
              <span>Topic : {item.topic}</span>
              <br />
              <br />
              <span style={{ float: "left", marginLeft: "8px" }}>
                ⌚{item.videoLength}
              </span>
              <button>
                <ion-icon name="heart" style={{ color: "orange" }}></ion-icon>
                {item.likes}
              </button>
              <button>
                <ion-icon name="eye" style={{ color: "orange" }}></ion-icon>
                {item.views}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

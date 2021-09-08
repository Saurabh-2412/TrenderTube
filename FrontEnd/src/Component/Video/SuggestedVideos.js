import React, { useState,useEffect } from "react";
import axios from "axios";
import { useVideoContext } from "../../Contexter/videoContext";

export function SuggestedVideos({suggestedId}){
    const [suggVideos, setSuggeVideos] = useState([]);
    const { history, dispatchgeneral } = useVideoContext();

    useEffect(() => {
        (async function () {
          const { data } = await axios.get(
            "https://VideoLibraryData.saurabhsharma11.repl.co/v1/videoData"
          );
          setSuggeVideos(data.videos);
        })();
    }, []);

    async function historyHandler(item){
        if(history.find((video) => video.videoId === item.videoId)){
        } else {
          const { data } = await axios.post(
            "https://VideoLibraryData.saurabhsharma11.repl.co/v1/recentlyPlayedVideos",{item}
          );
          //setSuggestedId(item.videoId)
          dispatchgeneral({ type: "ADD_TO_HISTORY", payload: data.savedVideo })
        }
        //navigate(`/videoplayer/${item.videoId}`);
      }

    const filteredSuggVideos = suggVideos.filter((video) => video.videoId !== suggestedId)

    return (
      <div>
            <div className="scrollmenu">
                <ul style={{ padding: "0px" }}>
                <h1 style={{ fontFamily: "italic", color: "orange" }}>
                    #suggestedList
                </h1>
                {filteredSuggVideos.map((item) => {
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
    )
}
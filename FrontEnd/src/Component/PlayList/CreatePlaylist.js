import React,{useState} from "react";
import axios from "axios";
import { usePlaylist } from "../../Contexter/playListContext";

export function CreatePlaylist(){
    const [text, setText] = useState("");
    const {
        inputPlaylistBox,
        dispatchplaylist,
    } = usePlaylist();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          handleOnclick();
        }
      };
    
      //creating playlist
      async function handleOnclick() {
        dispatchplaylist({ type: "DISPLAY_INPUT_BOX" });
        if(text !== ""){
          const { data } = await axios.post(
            "https://VideoLibraryData.saurabhsharma11.repl.co/v1/playlistVideos",{playlistName:text}
          );
          //console.log("created playlist",data.savedPlaylist);
          dispatchplaylist({ type: "CREATE_PLAY_LIST", payload: data.savedPlaylist });
          setText("");
        }
      };

    return (
        <div>
            {inputPlaylistBox && (
                <div className="modal--input">
                    <input
                        type="text"
                        placeholder="Enter Playlist Name"
                        className="modal--input-box"
                        onChange={(event) => setText(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleOnclick}>
                        Create
                    </button>
                </div>
            )}
        </div>
    )
}
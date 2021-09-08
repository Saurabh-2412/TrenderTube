import React from "react";
import { usePlaylist } from "../../Contexter/playListContext";

export function CreatePlaylistInput(){
    const { dispatchplaylist } = usePlaylist();

    return (
        <div className="modal--buttons">
            <button className="btn btn-secondary"
                onClick={() => dispatchplaylist({ type: "DISPLAY_INPUT_BOX" })}>
                New
            </button>
        </div>
    )
}
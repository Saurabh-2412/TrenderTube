import React from "react";
import { usePlaylist } from "../../Contexter/playListContext";

export function PlaylistHeader(){
    const { dispatchplaylist } = usePlaylist();
    
    return (
        <h1 className="modal--title">Playlist
            <span className="modal--icon"
                onClick={() => dispatchplaylist({ type: "SHOW_PLAYLIST_MODAL" })}>
                <ion-icon name="close"></ion-icon>
            </span>
        </h1>
    )
}
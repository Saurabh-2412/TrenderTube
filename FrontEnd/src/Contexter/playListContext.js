import { createContext, useContext, useReducer } from "react";
import { playlistReducer } from "../Reducer/playListReducer";

const playlistContext = createContext();

const initialState = {
  playList: [],
  playlistId: null,
  showPlaylistModal: {
    status: false,
    videoData: "",
  },
  inputPlaylistBox: false,
};

export const PlaylistProvider = ({ children }) => {
  const [state, dispatchplaylist] = useReducer(playlistReducer, initialState);
  return (
    <playlistContext.Provider value={{ ...state, dispatchplaylist }}>
      {children}
    </playlistContext.Provider>
  );
};

export const usePlaylist = () => {
  return useContext(playlistContext);
};
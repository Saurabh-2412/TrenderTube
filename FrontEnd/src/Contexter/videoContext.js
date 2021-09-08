import { createContext, useContext, useReducer } from "react";
import { generalReducer } from "../Reducer/videoReducer";

const videoContext = createContext();

const initialState = {
  history: []
};

export const VideoProvider = ({ children }) => {
  const [state, dispatchgeneral] = useReducer(generalReducer, initialState);
  return (
    <videoContext.Provider value={{ ...state, dispatchgeneral }}>
      {children}
    </videoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(videoContext);
};
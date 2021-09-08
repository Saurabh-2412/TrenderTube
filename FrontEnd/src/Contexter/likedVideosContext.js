import { createContext, useContext, useReducer } from "react";
import { likeReducer } from "../Reducer/likedReducer";

const likedVideosContext = createContext();

const initialState = {
  likeList: [],
  text: "Like"
};

export const LikedVideosProvider = ({ children }) => {
  const [state, dispatchlike] = useReducer(likeReducer, initialState);
  return (
    <likedVideosContext.Provider value={{ ...state, dispatchlike }}>
      {children}
    </likedVideosContext.Provider>
  );
};

export const useLikedVideoContext = () => {
  return useContext(likedVideosContext);
};

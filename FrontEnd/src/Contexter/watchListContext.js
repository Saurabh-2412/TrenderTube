import { createContext, useReducer, useContext } from "react";
import { watchListReducer } from "../Reducer/watchListReducer";
const watchListContext = createContext();

const initialState = {
  watchList: []
};

export const WatchListProvider = ({ children }) => {
  const [state, dispatchwatchlist] = useReducer(watchListReducer, initialState);
  return (
    <watchListContext.Provider value={{ ...state, dispatchwatchlist }}>
      {children}
    </watchListContext.Provider>
  );
};

export const useWatchListContext = () => {
  return useContext(watchListContext);
};

export const watchListReducer = (state, action) => {
    switch (action.type) {
      case "INITIAL_LOAD":
        return {
          ...state,
          watchList:action.payload
        }

      case "ADD_TO_WATCHLIST":
        return {
          ...state,
          watchList:[...state.watchList,action.payload]
        };

      case "REMOVE_FROM_WATCHLIST":
        return {
          ...state,
          watchList:action.payload
        };

      default:
        return{
           ...state
        };
    }
  };
  
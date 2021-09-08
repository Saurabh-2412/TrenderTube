export const generalReducer = (state, action) => {
    switch (action.type) {
      case "LOADING_HISTORY":
        return {
          ...state,
          history:action.payload
        }

      case "ADD_TO_HISTORY":
        //console.log(action.payload);
        if (state.history.some((item) => item.videoId === action.payload.videoId)) {
          return {
            ...state,
            history: [...state.history]
          } 
        } else {
          return {
            ...state,
            history: [...state.history,action.payload]
          }
        }
  
      case "REMOVE_FROM_HISTORY":
        return {
          ...state,
          history:action.payload
          //history: state.history.filter((item) => item.videoId !== action.payload)
        };
      
      default:
        return {
          ...state
        }
    }
  };
  
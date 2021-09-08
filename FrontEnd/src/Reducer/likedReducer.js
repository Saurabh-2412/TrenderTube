export const likeReducer = (state, action) => {
    switch (action.type) {
      case "INITIAL_LOAD":
        return {
          ...state,
          likeList:action.payload
        }
 
      case "ADD_TO_LIKED":
        return {
          ...state,
          likeList:[...state.likeList,action.payload]
        };

      case "REMOVE_FROM_LIKED":
        return {
          ...state,
          likeList:action.payload
        };
      
      default : 
        return {
          ...state
        }
    }
  };
  
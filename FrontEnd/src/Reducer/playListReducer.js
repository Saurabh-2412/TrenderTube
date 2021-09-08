export const playlistReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_LOAD":
      return {
        ...state,
        playList:action.payload
      }

    case "SHOW_PLAYLIST_MODAL":
      return {
        ...state,
        showPlaylistModal: {
          ...state.showPlaylistModal,
          status: state.showPlaylistModal.status === false ? true : false,
          videoData: action.payload === undefined ? "" : action.payload,
        }
      };
    
    case "DISPLAY_INPUT_BOX":
      return {
        ...state,
        inputPlaylistBox: state.inputPlaylistBox === false ? true : false,
      };

    case "CREATE_PLAY_LIST":
      return {
        ...state,
        playList: [ ...state.playList, {_id:action.payload._id, playlistName:action.payload.playlistName, playlistvideo:action.payload.playlistvideo} ]
      };

    case "SAVE_TO_PLAYLIST":
        const updatePlaylist = state.playList.map((element) => 
          {
            if(element._id === action.payload._id){
              return {...element,playlistvideo:action.payload.playlistvideo}
            } else{
              return element;
            }
          }
        )
      return {
        ...state,
        playList:updatePlaylist
        /* playList: state.playList.map((playlistItem) => {
          if (playlistItem.id === action.playlistId) {
            return {
              ...playlistItem,
              videos: playlistItem.videos.find(
                (playlistVideo) => playlistVideo === action.payload.videoId)
                ? playlistItem.videos.filter(
                    (playlistVideo) => playlistVideo !== action.payload)
                : [...playlistItem.videos, action.payload],
            };
          }
          return playlistItem;
        }),  */
      };

    case "REMOVE_FROM_PLAYLIST":
      const removeUpdatePlaylist = state.playList.map((element) => 
          {
            if(element._id === action.payload._id){
              return {...element,playlistvideo:action.payload.playlistvideo}
            } else{
              return element;
            }
          })
      return {
        ...state,
        playList:removeUpdatePlaylist
        /* playList: state.playList.map((playlistItem) => {
          if (playlistItem.id === action.playlistId) {
            return {
              ...playlistItem,
              videos: playlistItem.videos.filter(
                (playlistVideo) => playlistVideo !== action.payload)
            };
          }
          return playlistItem;
        }),  */
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playList: state.playList.filter((playlistitem) => playlistitem._id !== action.payload)
      };

    default:
      return state;
  }
};
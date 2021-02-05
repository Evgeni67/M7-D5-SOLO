export default function (state = {}, action) {
    switch (action.type) {
      case "ADD_SONGS_TO_EMINEM":
        console.log(state);
        return {
          ...state,
          eminemSongs: state.eminemSongs.concat(action.payload),
        };
      //pass an id not the whole object
      case "ADD_SONGS_TO_ARIANA":
        return {
            ...state,
            arianaGrandeSongs: state.arianaGrandeSongs.concat(action.payload),
        };
      case "ADD_SONGS_TO_MUSE":
        return {
          ...state,
          museSongs: state.museSongs.concat(action.payload),
        };
        case "SELECT_SONG":
        console.log(action.payload);
        return {
          ...state,
          selectedSong: action.payload,
        };
        case "ADD_TO_LIKED":
          console.log(action.payload);
          return {
            ...state,
            likedSongs: state.likedSongs.concat(action.payload),
          };
          case "REMOVE_FROM_LIKED":
            console.log(action.payload);
            return {
              ...state,
              likedSongs: state.likedSongs.filter(x=> x.id !== action.payload),
            };
        default:
        return state
    }
  }
  
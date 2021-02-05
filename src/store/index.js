import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import loadingReducer from "../reducers/loadingReducer";
import songsReducer from "../reducers/songsReducer";
import thunk from 'redux-thunk'

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // whats compose used for?

export const initialState = {
  songsArray: {
    eminemSongs: [],
    arianaGrandeSongs: [],
    museSongs:[],
    selectedSong:{},
    likedSongs:[],
  },
  load: {
    loading: false,
  },
  
};
const bigReducer = combineReducers({ songsArray: songsReducer, load:loadingReducer });

export default function configureStore() {
  return createStore(
    bigReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}

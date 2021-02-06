import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import Player from "./components/Player/Player";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AlbumPage from "./components/Detail/AlbumPage";
import ArtistPage from "./components/ArtistPage/ArtistPage";
import Comments from "./components/Comments/Comments";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  selectSong: (song) =>
    dispatch({
      type: "SELECT_SONG",
      payload: song,
    }),
  addDataToArtist: async (artistName) =>
    dispatch(async (dispatch, getState) => {
      let response = await fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artistName,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "ec5577de62msh9d203d454724b43p1f3c08jsnad1a59a31f6f",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let data = await response.json();
      console.log("DATA ->");
      console.log(data.data);
      console.log("<- DATA");
      let songs = data.data;
      if (artistName === "eminem") {
        dispatch({
          type: "ADD_SONGS_TO_EMINEM",
          payload: songs,
        });
      } else if (artistName === "muse") {
        dispatch({
          type: "ADD_SONGS_TO_MUSE",
          payload: songs,
        });
      } else if (artistName === "ariana") {
        dispatch({
          type: "ADD_SONGS_TO_ARIANA",
          payload: songs,
        });
      }
    }),
  startLoading: () =>
    dispatch({
      type: "START_LOADING",
    }),
  stopLoading: () =>
    dispatch({
      type: "STOP_LOADING",
    }),
  addToLiked: (song) => dispatch({ type: "ADD_TO_LIKED", payload: song }),
});

class App extends Component {
  componentDidMount = async () => {
    await this.props.addDataToArtist("eminem");
    await this.props.selectSong(
      this.props.songsArray.eminemSongs.slice(0, 1)[0]
    );
  };
  render() {
    return (
      <>
        <Router>
          <Sidebar />
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/AlbumPage/:id"
            render={(props) => <AlbumPage {...props} />}
          />
          <Route
            path="/ArtistPage"
            exact
            render={(props) => <ArtistPage {...props} />}
          />

          <Route
            path="/Comments/:songId"
            render={(props) => <Comments {...props} />}
          />
        </Router>
        {this.props.songsArray.isSongSelected ? (<Player />) : ("no selected")
        }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

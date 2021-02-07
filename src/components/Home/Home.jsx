import React, { Component } from "react";
import Gallery from "./Gallery";
import "./Gallery.css";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

//START OF REDUX

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
  
      let songs = data.data
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
});

//END OF REDUX
class Home extends Component {
  state = {
    eminemSongs: [],
    museSongs: [],
    arianaGrandeSongs: [],
    loading: true,
    error: false,
  };

  url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";

  fetchsongs = async () => {
    await this.props.addDataToArtist("muse");
    await this.props.addDataToArtist("ariana");
    await this.props.selectSong(this.props.songsArray.eminemSongs.slice(0,1)[0])

    await Promise.all([
      fetch(this.url + "eminem", {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ec5577de62msh9d203d454724b43p1f3c08jsnad1a59a31f6f",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((responseObject) => {
          this.setState({ eminemSongs: responseObject.data }, () =>
            console.log("not ours",this.state.eminemSongs)
          );
        }),
      fetch(this.url + "muse", {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ec5577de62msh9d203d454724b43p1f3c08jsnad1a59a31f6f",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ museSongs: responseObject.data })
        ),
      fetch(this.url + "halsey", {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ec5577de62msh9d203d454724b43p1f3c08jsnad1a59a31f6f",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ arianaGrandeSongs: responseObject.data })
        ),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("An error has occurred:", err);
      });
  };

  componentDidMount=async() => {
    await this.fetchsongs();
 
  }

  render() {
    return (
      <div>
        <div className="container-fluid mb-5">
          {this.state.error && (
            <Alert variant="danger" className="text-center">
              An error has occurred, please try again later
            </Alert>
          )}

          {!this.state.error && (
            <>
              <div className="container mb-4 text-center d-flex mx-auto justify-content-center">
                <nav aria-label="breadcrumb ml-5">
                  <ol className="breadcrumb ml-5">
                    <li className="breadcrumb-item ml-3">
                      <a href="#">Trending</a>
                      <div className="underbar"></div>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Podcast</a>
                      <div className="underbar"></div>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Moods and genres</a>
                      <div className="underbar"></div>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">New releases</a>
                      <div className="underbar"></div>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Discover</a>
                      <div className="underbar"></div>
                    </li>
                  </ol>
                </nav>
              </div>
              <Gallery
                title="#THROWBACKTHURSDAY"
              />
              <Gallery
                title="#TOP50ITALY"
              />
              <Gallery
                title="#TRENDINGNOW"
              />
              <Gallery
                title="#LIKED"
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

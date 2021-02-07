import React, { Component } from "react";
import { Col, Image, Container, Modal, Button, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { HiPlus } from "react-icons/hi";
import Gallery from "../Home/Gallery"
import "./playlist.css"
//START OF REDUX

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({

  addToPlaylist: (info) =>
    dispatch({
      type: "ADD_TO_PLAYLIST",
      payload: info,
    }),
  selectSong: (song) =>
    dispatch({
      type: "SELECT_SONG",
      payload: song,
    }),
  removeFromFav: (id) => {
    dispatch({ type: "REMOVE_FROM_FAV", payload: id });
  },
});

//END OF REDUX

class PlaylistPage extends Component {
  state = {
    show: false,
  };
  openContainer = () => {
    if (this.state.show === true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
    this.props.selectSong(this.props.song);
  };
  render() {
    return (
      <>
       <Gallery
                title={this.props.songsArray.currentPlaylist}
              />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);

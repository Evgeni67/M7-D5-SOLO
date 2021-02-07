import React, { Component } from "react";
import { Col, Image, Container, Modal, Button, Row } from "react-bootstrap";
import "./Gallery.css";
import { connect } from "react-redux";
import { HiPlus } from "react-icons/hi";
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

class Song extends Component {
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
        <Col
          className="songImage mb-3 mx-3 text-center d-flex justify-content-center align-items-center song-col"
          md={2}
        >
          <img
            src={this.props.song.album.cover_medium}
            onClick={() => this.props.selectSong(this.props.song)}
            className="songImage"
          />
          <Container className="plus">
            <HiPlus onClick={() => this.openContainer()} />
            <Container className="playlistSelect"></Container>
          </Container>
          <Container className={this.state.show ? "options" : "options d-none"}>
            {Object.getOwnPropertyNames(this.props.songsArray.playlists).map(
              (name) => (
                <Row
                  className="optionRow d-flex justify-content-center"
                  onClick={() =>
                    this.props.addToPlaylist([name, this.props.songsArray.selectedSong])
                  }
                >
                  {name}
                </Row>
              )
            )}
          </Container>
        </Col>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);

import React, { Component } from "react";
import { Col, Image , Container} from "react-bootstrap";
import "./Gallery.css";
import { connect } from "react-redux";
import { HiPlus } from "react-icons/hi";
//START OF REDUX

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
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
  render() {
    return (
      <>
        <Col
          className="songImage mb-3 mx-1 text-center d-flex justify-content-center align-items-center song-col"
          md={2}
        >
          <img
            src={this.props.song.album.cover_medium}
            onClick={() => this.props.selectSong(this.props.song)}
            className = "songImage"
          />
          <Container className = "plus">
            <HiPlus/>
            </Container>
        </Col>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);

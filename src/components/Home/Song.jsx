import React, { Component } from "react";
import { Col, Image } from "react-bootstrap";
import "./Gallery.css";
import { connect } from "react-redux";
//START OF REDUX

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  selectSong: (song) =>
    dispatch({
      type: "SELECT_SONG",
      payload: song,
    }),
    removeFromFav:(id) => {
      dispatch({type:"REMOVE_FROM_FAV",payload:id})
    }
});

//END OF REDUX

class Song extends Component {
  render() {
    return (
      <>
      <Col
        className="mb-3 mx-1 text-center d-flex justify-content-center align-items-center song-col"
        md={2}
      >
         
        <img src={this.props.song.album.cover_medium} onClick={()=> this.props.selectSong(this.props.song)}/>
       
      </Col>
     
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);

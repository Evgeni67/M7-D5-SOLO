import React, { Component } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import "./Gallery.css";
import { connect } from "react-redux";

import Song from "./Song";
const mapStateToProps = (state) => state;

class Gallery extends Component {
  render() {
    return (
      <div id="song mb-5 ">
        <h3 className="text-white text-left" style={{ marginLeft: "270px" }}>
          {this.props.title}
        </h3>
        <Row className="songsRow row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 no-gutters justify-content-start song-row">
          {this.props.title === "#THROWBACKTHURSDAY" &&
            this.props.songsArray.eminemSongs
              .slice(0, 5)
              .map((song) => <Song song={song} />)}
          {this.props.title === "#TOP50ITALY" &&
            this.props.songsArray.arianaGrandeSongs
              .slice(0, 5)
              .map((song) => <Song song={song} />)}
          {this.props.title === "#TRENDINGNOW" &&
            this.props.songsArray.museSongs
              .slice(0, 5)
              .map((song) => <Song song={song} />)}
          {this.props.title === "#LIKED" &&
            this.props.songsArray.likedSongs.map((song) => (
              <Song song={song} />
            ))}
          {this.props.songsArray.playlists[this.props.title] && this.props.songsArray.playlists[this.props.title]
       
            .map((song) => (
              <Song song={song} />
            ))}
        </Row>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Gallery);

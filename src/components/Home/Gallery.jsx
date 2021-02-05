import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import "./Gallery.css";
import { connect } from "react-redux";

import Song from "./Song";
const mapStateToProps = (state) => state;

const Gallery = (propsX) => {
  console.log("Gallery ", propsX.songsArray.eminemSongs.slice(0, 5));
  console.log("TITLE", propsX.title);
  return (
    <div id="song mb-5 ">
      <h3 className="text-white text-left" style={{ marginLeft: "270px" }}>
        {propsX.title}
      </h3>
      <Row className="row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 no-gutters justify-content-end song-row">
        {propsX.title === "#THROWBACKTHURSDAY" &&
          propsX.songsArray.eminemSongs
            .slice(0, 5)
            .map((song) => <Song song={song} />)}
        {propsX.title === "#TOP50ITALY" &&
          propsX.songsArray.arianaGrandeSongs
            .slice(0, 5)
            .map((song) => <Song song={song} />)}
        {propsX.title === "#TRENDINGNOW" &&
          propsX.songsArray.museSongs
            .slice(0, 5)
            .map((song) => <Song song={song} />)}
            {propsX.title === "#LIKED" &&
          propsX.songsArray.likedSongs
            
            .map((song) => <Song song={song} />)}
      </Row>
    </div>
  );
};
export default connect(mapStateToProps)(Gallery);

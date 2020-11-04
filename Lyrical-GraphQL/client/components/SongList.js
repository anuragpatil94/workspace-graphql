import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { fetchSongs } from "../queries/query";
class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        {title}
      </li>
    ));
  }
  render() {
    if (!this.props.data.loading)
      return (
        <div>
          <ul className="collection">{this.renderSongs()}</ul>
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
    else return <p>Loading!!!</p>;
  }
}

export default graphql(fetchSongs)(SongList);

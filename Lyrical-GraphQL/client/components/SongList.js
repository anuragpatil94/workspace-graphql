import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { deleteSong } from "../queries/mutation";
import { fetchSongs } from "../queries/query";
class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id },
        // refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => this.onSongDelete(id)}>
          delete
        </i>
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

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));

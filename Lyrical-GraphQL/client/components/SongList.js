import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
class SongList extends Component {
  renderSongs() {
    if (!this.props.data.loading)
      return this.props.data.songs.map(({ id, title }, index) => (
        <li key={id}>{title}</li>
      ));
    else return <p>Loading!!!</p>;
  }
  render() {
    return (
      <div>
        <h2>Songs List</h2>
        {this.renderSongs()}
      </div>
    );
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);

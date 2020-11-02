import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
class SongList extends Component {
  renderSongs() {
    if (!this.props.data.loading)
      return this.props.data.songs.map(({ id, title }, index) => (
        <li className="collection-item" key={id}>
          {title}
        </li>
      ));
    else return <p>Loading!!!</p>;
  }
  render() {
    return <ul className="collection">{this.renderSongs()}</ul>;
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

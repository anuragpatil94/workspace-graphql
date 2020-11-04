import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        {title}
      </li>
    ));
  }
  render() {
    console.log(this.props);

    if (!this.props.data.loading)
      return <ul className="collection">{this.renderSongs()}</ul>;
    else return <p>Loading!!!</p>;
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

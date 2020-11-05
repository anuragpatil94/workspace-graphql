import React from "react";
import { graphql } from "react-apollo";
import { fetchSong } from "../queries/query";

class SongDetail extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <h3>Song Detail</h3>
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.match.params.id } };
  },
})(SongDetail);

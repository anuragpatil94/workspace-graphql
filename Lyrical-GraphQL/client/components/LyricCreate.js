import React from "react";
import { graphql } from "react-apollo";
import { createLyric } from "../queries/mutation";
import { fetchSong } from "../queries/query";

class LyricCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          songId: this.props.songId,
          content: this.state.content,
        },
      })
      .then(() => {});
    this.setState({ content: "" });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

export default graphql(createLyric)(LyricCreate);

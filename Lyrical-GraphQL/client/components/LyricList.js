import React from "react";
import { graphql } from "react-apollo";
import { likeLyric } from "../queries/mutation";

class LyricList extends React.Component {
  onLikeLyric(id, likes) {
    this.props.mutate({
      variables: {
        id: id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }
  renderLyric() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <div className="vote-box">
          <i
            className="material-icons"
            onClick={() => this.onLikeLyric(id, likes)}
          >
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }
  render() {
    return <ul className="collection">{this.renderLyric()}</ul>;
  }
}

export default graphql(likeLyric)(LyricList);

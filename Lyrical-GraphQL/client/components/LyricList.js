import React from "react";
import { graphql } from "react-apollo";
import { likeLyric } from "../queries/mutation";

class LyricList extends React.Component {
  onLikeLyric(id) {
    this.props.mutate({
      variables: {
        id: id,
      },
    });
  }
  renderLyric() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        {/* <span>
          <i className="material-icons" onClick={() => this.onLikeLyric(id)}>
            thumb_up
          </i>
          {likes}
        </span> */}
      </li>
    ));
  }
  render() {
    return <ul className="collection">{this.renderLyric()}</ul>;
  }
}

export default graphql(likeLyric)(LyricList);

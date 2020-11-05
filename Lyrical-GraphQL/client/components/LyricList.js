import React from "react";
class LyricList extends React.Component {
  renderLyric() {
    console.log(this.props);

    return this.props.lyrics.map(({ id, content, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <i className="material-icons">thumb_up</i>
      </li>
    ));
  }
  render() {
    return <ul className="collection">{this.renderLyric()}</ul>;
  }
}

export default LyricList;

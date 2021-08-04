import gql from "graphql-tag";

export const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

// `!` mark means that id is required
export const fetchSong = gql`
  query FetchSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

import gql from "graphql-tag";

export const deleteSong = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export const createLyric = gql`
  mutation CreateLyric($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
    }
  }
`;

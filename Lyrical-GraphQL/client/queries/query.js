import gql from "graphql-tag";

export const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

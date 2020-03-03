import gql from "graphql-tag"

export const SONGS_ADDED_SUBSCRIPTION = gql`
  subscription onSongAdded($roomId: String!) {
    songAdded(roomId: $roomId) {
        id
        name
        album{
          id
          images{
            height
            width
            url
          }
        }
        artists{
          id
          name
        }
        duration_ms
        score
    }
  }
`;
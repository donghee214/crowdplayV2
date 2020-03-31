import gql from "graphql-tag"

export const SONGS_ADDED_SUBSCRIPTION = gql`
  subscription ($roomId: ID!) {
    songAdded(roomId: $roomId){
        id
        name
        isRec
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

export const SONG_UPVOTED = gql`
    subscription ($songId: ID!){
        id
        score
    }
`
import gql from 'graphql-tag';


export const GET_ROOM = gql`
  query Room($id: ID!){
    room(id: $id){
      id
      name
      adminUser{
        id
      }
      songs{
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
  }
`

export const GET_SONGS = gql`
  query Songs($roomId: ID!){
    songs(roomId: $roomId){
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
`

export const GET_SONG_RECS = gql`
  query getSongRec($seed: [String]!){
    songRecs(seed: $seed){
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
`
import gql from 'graphql-tag';

export const GET_SEARCH = gql`
  query Search($query: String!, $limit: Int, $offset: Int){
    search(q: $query, limit: $limit, offset: $offset){
      artists{
        id
        name
        images{
          height
          width
          url
        }
      }
      tracks{
        id
        name
        artists{
          name
        }
        duration_ms
        album{
          images{
            height
            width
            url
          }
        }
      }
      albums{
        id
        name
        images{
          height
          width
          url
        }
      }
      playlists{
        id
        name
        description
        images{
          height
          width
          url
        }
        tracks{
          href
          total
        }
        primary_color
      }
    }
  }
`

export const GET_ROOM = gql`
  query Room($id: ID!){
    room(id: $id){
      id
      name
      adminUser{
        id
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
      popularity
      preview_url
      href
      uri
      album{
        id
        album_type
        href
        images{
          height
          width
          url
        }
      }
      artists{
        id
        name
        uri
        href
      }
      duration_ms
    }
  }
`
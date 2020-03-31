import gql from 'graphql-tag';

export const ADD_SONG = gql`
    mutation AddSongToRoom($roomId: ID!, $song: SongInput){
        addSongToRoom(roomId: $roomId, song: $song)
    }
`

export const UPVOTE_SONG = gql`
    mutation UpvoteSong($roomId: ID!, $trackId: ID!){
        upvoteSong(roomId: $roomId, trackId: $trackId)
    }
`
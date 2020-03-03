import gql from 'graphql-tag';

export const ADD_SONG = gql`
    mutation AddSongToRoom($roomId: ID!, $trackId: ID!){
        addSongToRoom(roomId: $roomId, trackId: $trackId)
    }
`
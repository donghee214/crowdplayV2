import gql from 'graphql-tag';


export const GET_ROOM = gql`
  query Room($id: ID!){
    room(id: $id){
      id
      name
    }
  }
`
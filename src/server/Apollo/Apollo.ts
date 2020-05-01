import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-boost';
import { TILE_TYPES } from "shared/components/MusicTile"
const cache = new InMemoryCache({
    addTypename: false
})

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: cache,
    resolvers: {}
})

cache.writeData({
    data: {
        toast: {
            id: "",
            message: ""
        },
        browse: {
            id: "",
            href: "",
            primaryLabel: "",
            secondaryLabel: "",
            image: "",
            type: TILE_TYPES.TRACK,
            active: false
        },
        songs: []
    }
})

export default client
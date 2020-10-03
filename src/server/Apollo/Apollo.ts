import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-boost';
import { TILE_TYPES } from "shared/components/MusicTile"
import * as dotenv from 'dotenv';

dotenv.config()

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
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
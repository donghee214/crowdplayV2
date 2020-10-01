import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SpotifySong } from "shared/types";
import { GET_ADDED_SONG_IDS } from "server/Apollo/Queries"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { ADD_SONG } from "server/Apollo/Mutations"
import { useApolloClient } from "@apollo/react-hooks";

const WithQueueSong = (Component: any) => (props: any) => {
    const location = useLocation()
    const roomId = location.pathname.split("/").pop()
    const client = useApolloClient();

    const { data: addedSongIds } = useQuery(GET_ADDED_SONG_IDS)
    const [addSong, { data: addSongData, error: addSongDataError }] = useMutation(ADD_SONG)
    const [clicked, setClicked] = useState(false)

    const queueSong = (data: SpotifySong) => {
        if (clicked) {
            client.writeData({
                data: {
                    toast: {
                        id: props.data.id + "_already_added",
                        message: "Song already in queue"
                    }
                }
            })
        }
        else {
            addSong({
                variables: { roomId, song: data }
            })
            client.writeData({
                data: {
                    toast: {
                        id: props.data.id,
                        message: "Song added"
                    }
                }
            })
            setClicked(true)
        }
    }

    useEffect(() => {
        if (addedSongIds) {
            if (addedSongIds.songs.includes(props.data.id)) {
                setClicked(true)
            }
            else {
                setClicked(false)
            }
        }
    }, [addedSongIds])

    return <Component clicked={clicked} setClicked={setClicked} queueSong={queueSong} {...props} />
}

export default WithQueueSong
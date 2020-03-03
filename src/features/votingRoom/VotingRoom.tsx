import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Song } from "shared/types"
import Loading from "shared/components/Loading"
import CurrentlyPlaying from "features/votingRoom/CurrentlyPlaying"
import { useQuery } from "@apollo/react-hooks";
import { GET_SONG_RECS, GET_ROOM } from "server/Apollo/Queries"
import { SONGS_ADDED_SUBSCRIPTION } from "server/Apollo/Subscriptions"
import MusicTile from "shared/components/MusicTile"
import db from "server/Firestore"

interface VotingRoomProps {

}

const VotingRoom: React.FC<VotingRoomProps> = () => {
    const location = useLocation()
    const roomId = location.pathname.split("/").pop()
    let { loading: recsLoading, data: recsData, error: recsError } = useQuery(GET_SONG_RECS, { variables: { seed: ["dance"] } })
    let { loading: songsLoading, data: roomData, error: songsError, subscribeToMore, updateQuery } = useQuery(GET_ROOM, { variables: { id: roomId } })
    subscribeToMore({
        document: SONGS_ADDED_SUBSCRIPTION,
        variables: { roomId },
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newSong = subscriptionData.data.songAdded;
            console.log(newSong)
            return Object.assign({}, prev, {
                room: {
                    songs: [newSong, ...prev.entry.comments]
                }
            });
        }
    })

    // useEffect(() => {
    //     const unsub = db.collection(`rooms/${roomId}/songs`).onSnapshot((snapshot) => {
    //         let newSongs: any = []
    //         snapshot.docChanges().forEach((change) => {
    //             if (change.type == "added") {
    //                 newSongs.push(change.doc.data())
    //             }
    //         })
    //         roomData.room.songs = [...roomData.room.songs, ...newSongs]
    //     })
    //     return () => unsub()
    // }, [])

    // useEffect(() => {
    //     if (!roomData || !recsData) return
    //     let ids = new Set()
    //     let allSongs = [...roomData.room.songs.sort((a: Song, b: Song) => b.score - a.score), ...recsData.songRecs]
    //     allSongs = allSongs.filter((song) => {
    //         if (song.id in ids) return false
    //         ids.add(song.id)
    //         return true
    //     })
    //     setTiles(allSongs)
    // }, [roomData, recsData])

    const songToTile = (songs: Song[]) => {
        let nextLargePortrait = 1
        let addition = 10
        return songs.map((song: Song, index: number) => {
            if (index == nextLargePortrait) {
                if (addition == 8) {
                    addition = 10
                }
                else {
                    addition = 8
                }
                nextLargePortrait += addition
                return <MusicTile key={song.id} song={song} large={true} roomId={roomId} />
            }
            return <MusicTile key={song.id} song={song} large={false} roomId={roomId} />
        })
    }

    const renderVotingContent = () => {
        if (recsLoading || songsLoading) return <Loading />
        if (recsError || songsError) return <h2>Oops something went wrong!</h2>
        return <h2>Oops something went wrong!</h2>
    }

    return (
        <div className="votingroom_song-container">
            <CurrentlyPlaying roomName={roomId} />
            {roomData && recsData && songToTile([...roomData.room.songs, ...recsData.songRecs])}
        </div>
    )
}

export default React.memo(VotingRoom)
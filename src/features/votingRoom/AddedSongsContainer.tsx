import React, { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useLazyQuery } from '@apollo/react-hooks';
import { Song } from "shared/types"
import db from "server/Firestore"
import AddSong from "assets/svgs/AddSong"
import Loading from "shared/components/Loading"
import Input from "shared/components/Input"
import { GET_SEARCH } from "server/Apollo/Queries"
import RecSongs from "features/votingRoom/RecSongs"

interface AddedSongsContainerProps {
    songToTile: Function;
    setIsSearch: Function;
    setContainerHeight: Function;
}

const AddedSongsContainer: React.FC<AddedSongsContainerProps> = ({
    songToTile,
    setIsSearch,
    setContainerHeight
}) => {
    const location = useLocation()
    const roomId = location.pathname.split("/").pop()
    const [songs, setSongs] = useState<Song[]>([])
    const measureRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const addSongs = (newSongs: Song[]) => {
        newSongs.sort((a, b) => b.score - a.score)
        setSongs(prevSongs => [...prevSongs, ...newSongs])
    }

    const deleteSongs = (deleteSongs: String[]) => {
        const newSongs = songs.filter((song) => deleteSongs.includes(song.trackId))
        setSongs(newSongs)
    }

    const modifySongs = (modifySongs: Song[]) => {
        setSongs((prevSongs: Song[]) => {
            modifySongs.forEach((songToModify) => {
                const idx = prevSongs.findIndex((song) => songToModify.trackId === song.trackId)
                prevSongs[idx] = songToModify
            })
            return [...prevSongs]
        })
    }

    useEffect(() => {
        const unsub = db.firestore().collection(`rooms/${roomId}/songs`).onSnapshot((snapshot) => {
            let newSongs: Song[] = [], modifiedSongs: Song[] = [], deletedSongs: string[] = []
            snapshot.docChanges().forEach((change) => {
                const song = change.doc.data() as Song
                if (change.type === "added") {
                    newSongs.push(song)
                }
                if (change.type === "modified") {
                    modifiedSongs.push(song)
                }
                if (change.type === "removed") {
                    deletedSongs.push(song.trackId)
                }
            })
            addSongs(newSongs)
            // deleteSongs(deletedSongs)
            modifySongs(modifiedSongs)
            setLoading(false)
        })
        return () => unsub()
    }, [])

    useEffect(() => {
        const node = measureRef.current!
        setContainerHeight(node.getBoundingClientRect().height)
    }, [songs])

    return (
        <div ref={measureRef}>
            <div className="votingroom_titleLabel-container">
                <div style={{ textAlign: 'left' }}>
                    <h2 style={{ fontSize: '1.4rem' }}>
                        Up next
                    </h2>
                    <h4 style={{ marginTop: '-1px' }}>
                        Double tap to upvote a song!"
                    </h4>
                </div>
                <div className="votingroom_addSong-container" onClick={() => setIsSearch(true)}>
                    <AddSong />
                </div>
            </div>

            <div className="votingroom_song-container">
                {loading &&
                    <div className="votingroom_loading-container">
                        <Loading classNameText={"votingroom-loading"} />
                    </div>
                }
                {songToTile({ songs: songs, isRec: false })}
            </div>
            <RecSongs songToTile={songToTile} />
        </div>
    )
}

export default AddedSongsContainer
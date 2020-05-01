import React, { useState, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { Song } from "shared/types"
import CurrentlyPlaying from "features/votingRoom/CurrentlyPlaying"
import AddedSongContainer from "features/votingRoom/AddedSongsContainer"
import SearchSongsContainer from "features/votingRoom/SearchSongsContainer"
import MusicTile, { TILE_TYPES } from "shared/components/MusicTile"
import { CSSTransition } from "react-transition-group";
import BrowseSongsContainer from "features/browse/BrowseSongsContainer"


interface VotingRoomProps {

}

const VotingRoom: React.FC<VotingRoomProps> = () => {
    const location = useLocation()
    const roomId = location.pathname.split("/").pop()
    const [isSearch, setIsSearch] = useState<boolean>(false)

    // const songsRef = useRef<HTMLDivElement>(null)

    const toggleSearch = (val: boolean) => {
        setIsSearch(val)
        // const node = songsRef.current!
        // SET SCROLL BEHAVIOUR TRUE ON CLASS "votingRoom-container" AS A RESULT FOR SMOOTH SCROLLING
        // SEE IF THIS EFFECTED NEGATIVELY PERFORMANCE LATER
        // node.scrollIntoView(true)
    }

    const songToTile = ({ songs, isRec }: { songs: Song[], isRec: boolean }) => {
        if (songs.length === 0) {
            return (
                <div className="votingroom-noResultMesaage">
                    <h2>
                        No songs here yet!
                </h2>
                    <h4 style={{ marginTop: "4px" }}>
                        Click the green plus to search for tracks to add
                    </h4>
                </div>
            )
        }
        let nextLargePortrait = 1
        let addition = 10
        return songs.map((song: Song, index: number) => {
            let large = false
            if (index == nextLargePortrait) {
                if (addition == 8) {
                    addition = 10
                }
                else {
                    addition = 8
                }
                nextLargePortrait += addition
                large = true
            }
            return (
                <MusicTile
                    key={song.trackId}
                    data={song.song}
                    large={large}
                    score={song.score}
                    voters={song.voters}
                    roomId={roomId ? roomId : ''}
                    tileType={isRec ? TILE_TYPES.TRACK : TILE_TYPES.ADDED_TRACK}
                />
            )
        })
    }
    return (
        <div className="votingRoom-container">
            <CurrentlyPlaying
                roomName={roomId}
            />
            <div className="votingroom_currentlyPlayingBuffer" />
            <div className="votingroom_addedSongs-container">
                <div className="votingroom_addedSong-tab" />
                <CSSTransition
                    // appear={true}
                    unmountOnExit={false}
                    in={!isSearch}
                    timeout={500}
                    classNames="fade-animation-addedSongs">
                    <AddedSongContainer
                        songToTile={songToTile}
                        setIsSearch={toggleSearch}
                    />
                </CSSTransition>
                <CSSTransition
                    // appear={true}
                    // mountOnEnter={true}
                    unmountOnExit={true}
                    in={isSearch}
                    timeout={500}
                    classNames="fade-animation-searchContainer">
                    <SearchSongsContainer
                        setIsSearch={toggleSearch}
                        roomId={roomId ? roomId : ""}
                    />
                </CSSTransition>
            </div>
            <BrowseSongsContainer />
        </div>
    )
}

export default React.memo(VotingRoom)
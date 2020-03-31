import React, { useState, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { Song } from "shared/types"
import CurrentlyPlaying from "features/votingRoom/CurrentlyPlaying"
import AddedSongContainer from "features/votingRoom/AddedSongsContainer"
import SearchSongsContainer from "features/votingRoom/SearchSongsContainer"
import MusicTile from "shared/components/MusicTile"
import { CSSTransition } from "react-transition-group";



interface VotingRoomProps {

}

const VotingRoom: React.FC<VotingRoomProps> = () => {
    const location = useLocation()
    const roomId = location.pathname.split("/").pop()
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [containerHeight, setContainerHeight] = useState<number>(200)

    const songsRef = useRef<HTMLDivElement>(null)

    const toggleSearch = (val: boolean) => {
        setIsSearch(val)
        const node = songsRef.current!
        node.scrollIntoView({ behavior: "smooth" })
    }

    const songToTile = ({ songs, isRec }: { songs: Song[], isRec: boolean }) => {
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
                return <MusicTile key={song.trackId} song={song.song} large={true} score={song.score} roomId={roomId} />
            }
            return <MusicTile key={song.trackId} song={song.song} large={false} score={song.score} roomId={roomId} />
        })
    }
    return (
        <div className="votingRoom-container">
            <CurrentlyPlaying
                roomName={roomId}
            />
            <div className="votingroom_currentlyPlayingBuffer" />
            <div className="votingroom_addedSongs-container" ref={songsRef} style={{ height: containerHeight + 100 }}>
                <div className="votingroom_addedSong-tab" />

                <CSSTransition
                    appear={true}
                    // unmountOnExit={true}
                    in={!isSearch}
                    timeout={400}
                    classNames="votingroom-musictile-animation">
                    <AddedSongContainer
                        songToTile={songToTile}
                        setIsSearch={toggleSearch}
                        setContainerHeight={setContainerHeight}
                    />

                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit={true}
                    in={isSearch}
                    timeout={400}
                    classNames="votingroom-musictile-animation">
                    <SearchSongsContainer
                        setIsSearch={toggleSearch}
                    />
                </CSSTransition>

            </div>

        </div>
    )
}

export default React.memo(VotingRoom)
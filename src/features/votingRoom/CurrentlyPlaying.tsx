import React, { useEffect, useState } from "react"
import db from "server/Firestore"
import Loading from "shared/components/Loading"
import { Room, Song } from "shared/types"
import Back from "assets/svgs/Back"
import Share from "assets/svgs/Share"
import { useHistory } from "react-router-dom"
import Button from "shared/components/Button"
import { useApolloClient } from "@apollo/react-hooks";

interface CurrentlyPlayingProps {
    roomName?: string
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ roomName }) => {
    const [song, setSong] = useState<Song | undefined>()
    const [vibrantColour, setVibrantColour] = useState<number[]>([255, 255, 255])
    const history = useHistory()
    const client = useApolloClient()

    useEffect(() => {
        const unsub = db.firestore().doc(`rooms/${roomName}`).onSnapshot((doc) => {
            const room = doc.data() as Room
            setSong(room?.currentSong)
            setVibrantColour(room?.vibrantColour || [30, 215, 96])
        })
        return () => unsub()
    }, [])

    const back = () => {
        history.push({
            pathname: `/`
        })
    }

    const renderSong = () => {
        if (!song) {
            return <Loading />
        }
        return (
            <React.Fragment>
                <div style={{ width: "250px" }}>
                    <div className="votingroom_currentlyPlaying-albumCover"
                        style={{
                            backgroundImage: `url(${song.song.album.images[0].url})`
                        }}
                    />
                </div>

                <div className="votingroom_currentlyPlaying-titleContainer">
                    <h2 style={{ color: `rgb(${vibrantColour[0]}, ${vibrantColour[1]}, ${vibrantColour[2]})` }}>
                        {song.song.name}
                    </h2>
                    <h4 style={{ marginTop: '4px' }}>
                        {song.song.artists[0].name}
                    </h4>
                </div>
            </React.Fragment>
        )
    }

    // man this is really dumb 
    const copyUrl = () => {
        var dummy = document.createElement('input'),
            text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        client.writeData({
            data: {
                toast: {
                    id: Math.random().toString(),
                    message: "Link copied to clipboard!"
                }
            }
        })
    }

    return (
        <div className="votingroom_currentlyPlaying-container">
            <div className="votingRoom-background-opacityLayer" />
            <div className="votingRoom-background" style={{
                backgroundColor: `rgba(${vibrantColour[0]}, ${vibrantColour[1]}, ${vibrantColour[2]}, 0.8)`
            }} />
            <div className="votingroom_currentlyPlaying-roomInfo_container">
                <Button callback={back} className={"back__mouseUp"} mouseDownClassName={"back__mouseDown"}>
                    <Back />
                </Button>
                <div>
                    <h4 className="votingroom_currentlyPlaying-roomLabel">
                        Roomname:
                    </h4>
                    <h2 className="votingroom_currentlyPlaying-roomName" >
                        {roomName}
                    </h2>
                </div>
                <Button
                    callback={copyUrl}
                    className={"share__mouseUp"}
                    mouseDownClassName={"share__mouseDown"}>
                    <Share />
                </Button>

            </div>
            {renderSong()}
        </div>
    )
}

export default React.memo(CurrentlyPlaying)
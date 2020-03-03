import React, { useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import db from "server/Firestore"

interface CurrentlyPlayingProps {
    roomName?: string
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ roomName }) => {
    useEffect(() => {
        const unsub = db.doc(`rooms/${roomName}`).onSnapshot((doc) => {
            console.log(doc.data())
        })
        return () => unsub()
    }, [])
    return (
        <div>
            henlo
        </div>
    )
}

export default React.memo(CurrentlyPlaying)
import React, { useState, useEffect } from "react"
import Loading from "shared/components/Loading"
import { Room } from "shared/types"
import RoomCard from "features/onboarding/RoomCard"
import db from "server/Firestore"

interface NearbyRoomsProps {
    joinRoomCallback: (roomId: string) => Promise<void>;
}

const NearbyRooms: React.FC<NearbyRoomsProps> = ({ joinRoomCallback }) => {
    const [rooms, setRooms] = useState<Room[]>([])
    useEffect(() => {
        const unsub = db.firestore().collection("rooms").onSnapshot((snapshot) => {
            let rooms = snapshot.docs.map((doc): Room => doc.data() as Room)
            setRooms(rooms)
        })
        return () => unsub()
    }, [])

    const renderRooms = () => {
        if (!rooms) {
            return <Loading classNameText={"loadingGreen"} />
        }
        else if (rooms.length == 0) {
            return <p>No rooms found around your area!</p>
        }
        return rooms.map((room: Room, index: any) => (
            <RoomCard
                key={room.id}
                color={colors[index % colors.length]}
                onClick={() => joinRoomCallback(room.id)}
                {...room} />
        ))
    }
    const colors = ["#5756FC", "#E586A3", "#88D1D5", "#59C3C3", "#52489C"]
    return (
        <div className="home-screen_nearby-container">
            <h4 className="home-screen_nearby-container-title">
                Nearby
            </h4>
            <div className="home-screen_nearby-scroll-container">
                {renderRooms()}
            </div>
        </div>
    )
}

export default React.memo(NearbyRooms)
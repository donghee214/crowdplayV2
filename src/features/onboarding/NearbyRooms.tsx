import React, { useState, useEffect } from "react"
import Loading from "shared/components/Loading"
import { Room } from "shared/types"
import RoomCard from "features/onboarding/RoomCard"
import db from "server/Firestore"


const NearbyRooms = () => {
    const [rooms, setRooms] = useState()
    db.collection("rooms")
        .onSnapshot((snapshot) => {
            let rooms = snapshot.docs.map((doc) => doc.data())
            setRooms(rooms)
        })
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
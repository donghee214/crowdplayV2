import React, { Component } from 'react'
import { Room } from "shared/types"

interface RoomCardProps extends Room {
    color: string;
    onClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ color, admin, id, currentSong, vibrantColour, lightVibrantColour, darkVibrantColour, onClick }) => {
    return (
        <div className="room-card_container" style={{ backgroundColor: color }} onClick={onClick}>
            <div>
                <h4 className="room-card_container_subtitle">
                    Room
            </h4>
                <h4 className="room-card_container_title">
                    {id}
                </h4>
            </div>
            <div>
                <h4 className="room-card_container_subtitle">
                    Currently Playing
            </h4>
                <h4 className="room-card_container_title">
                    {currentSong ? currentSong.song.name : "No song"}
                </h4>
            </div>
        </div>
    )
}

export default RoomCard
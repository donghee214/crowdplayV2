import React, { Component } from 'react'
import { Room } from "shared/types"

interface RoomCardProps extends Room {
    color: string
}

const RoomCard: React.FC<RoomCardProps> = ({ name, color }) => (
    <div className="room-card_container" style={{ backgroundColor: color }}>
        <h4 className="room-card_container_title">
            {/* {name} */}
        </h4>
    </div>
)

export default RoomCard
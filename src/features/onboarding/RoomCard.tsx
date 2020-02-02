import React, { Component } from 'react'

interface RoomCardProps {
    roomName: string
}

const RoomCard: React.FC<RoomCardProps> = ({ roomName }) => (
    <div className="room-card_container">
        <h4 className="room-card_container_title">
            {roomName}
        </h4>
    </div>
)

export default RoomCard
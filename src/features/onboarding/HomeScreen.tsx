import React, { Component } from 'react';
import RoomCard from "features/onboarding/RoomCard"
import Button from "shared/components/Button"

const HomeScreen = () => (
  <div className="home-screen">
    <div className="home-screen_title-container">
      <h2>
        chocolate<span className="home-screen_title_green">.</span>
      </h2>

    </div>
    <div className="home-screen_nearby-container">
      <h4 className="home-screen_nearby-container-title">
        Nearby
      </h4>
      <div className="home-screen_nearby-scroll-container">
        {["room1", "room2", "room3"].map((val) => <RoomCard roomName={val} />)}
      </div>
    </div>
    <div className="home-screen_join-room-container">
      <h4 className="home-screen_nearby-container-title">
        Join Room
      </h4>
      <input className="home-screen_join-room-input" placeholder="Enter Room Code" />
      <Button>
        <h4 className="buttonText">
          Join
        </h4>
      </Button>
    </div>
    <div className="home-screen_create-room-container">
      <h4 className="home-screen_nearby-container-title">
        Create Room
      </h4>

    </div>
  </div>
);

export default HomeScreen;

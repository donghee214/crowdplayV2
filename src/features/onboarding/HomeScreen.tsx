import React, { useState, useEffect } from 'react';
import Button from "shared/components/Button"
import Input from "shared/components/Input"
import Loading from "shared/components/Loading"
import NearbyRooms from "features/onboarding/NearbyRooms"
import { useHistory } from "react-router-dom"
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_ROOM } from "server/Apollo/Queries"


interface HomeScreenProps {

}

const HomeScreen: React.FC<HomeScreenProps> = () => {

  const [roomInput, setRoomInput] = useState("")
  const [runQuery, { called, loading, data, error }] = useLazyQuery(GET_ROOM)
  const history = useHistory()

  const updateRoomInput = (e: React.FormEvent<HTMLInputElement>) => {
    setRoomInput(e.currentTarget.value)
  }

  useEffect(() => {
    if (data) {
      history.push({
        pathname: `/voting_room/${roomInput}`
      })
    }
  }, [data])

  const sanitize = (str: string) => {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "")
    return str.trim()
  }

  const joinRoomCallback = async (roomId: string) => {
    roomId = sanitize(roomId)
    setRoomInput(roomId)
    localStorage.setItem('browserID', 'Tom');
    await runQuery({
      variables: { id: roomId }
    })

  }
  return (
    <div className="home-screen">
      <div className="home-screen_title-container">
        <h2 className="home-screen_title-container__font">
          chocolate<span className="home-screen_title_green">.</span>
        </h2>
      </div>
      <NearbyRooms joinRoomCallback={joinRoomCallback} />
      <div className="home-screen_join-room-container">
        <h4 className="home-screen_nearby-container-title">
          Join Room
        </h4>
        <Input
          onChangeCallback={updateRoomInput}
          value={roomInput}
          placeholder={"Enter Room ID"}
          errorMessage={error && error.message}
          callback={() => joinRoomCallback(roomInput)}
          customClassName={"input__placeholder"}
        />
        <div className="home-screen_buttonContainer">
          <Button
            callback={() => joinRoomCallback(roomInput)}
            className={"btn"}
            mouseDownClassName={"btn__mousedown"}
          >
            <h4 className="buttonText">
              {loading ? <Loading /> : "Join"}
            </h4>
          </Button>
        </div>

      </div>
      <div className="home-screen_create-room-container">
        <h4 className="home-screen_nearby-container-title">
          Create Room
        </h4>
        <p className="home-screen_create-room-text">
          Unfortunately, no support for playback exists on web for mobile yet! Get the app here.
        </p>
      </div>
    </div>
  )
};

export default React.memo(HomeScreen);

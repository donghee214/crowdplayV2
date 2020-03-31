import React, { useState, useEffect } from "react";
import { SpotifySong, Song } from "shared/types";
import { useMutation } from "@apollo/react-hooks"
import { ADD_SONG, UPVOTE_SONG } from "server/Apollo/Mutations"
import AddedSong from "assets/svgs/AddedSong"

import db from "server/Firestore"

interface Props {
  song: SpotifySong;
  large: boolean;
  roomId?: string;
  score: number;
}


//TODO: REFACTOR INTO A CONTAINER COMPONENT, ONE FOR RECS THE OTHER FOR ADDED SONGS
const MusicTile = ({ song, large, roomId, score }: Props) => {
  const [addSong, { data: addSongData, error: addSongDataError }] = useMutation(ADD_SONG)
  const [upvoteSong, { data: upvoteSongData }] = useMutation(UPVOTE_SONG)
  const [upVoted, setUpVoted] = useState<number>(0)
  const [isAdded, setIsAdded] = useState(false)


  const clickHandler = () => {
    if (!score && !isAdded) {
      setIsAdded(true)
      addSong({
        variables: { roomId, song: song as SpotifySong }
      })
      return
    }
    else {
      const songRef = db
        .firestore()
        .doc(`rooms/${roomId}/songs/${song.id}`)
      songRef.update({
        score: db.firestore.FieldValue.increment(1)
      })
    }
  }

  const renderScore = () => {
    if (!score) {
      return (
        <div className="music-tile__score-container">
          <h3 className="music-tile__song-score">
            <AddedSong active={isAdded} isLarge={large} />
          </h3>
        </div>

      )
    }
    return (
      <h3 className="music-tile__song-score">
        {score + upVoted}
      </h3>
    )
  }

  return (
    <div
      className={`${large && "music-tile__container__large"} music-tile__container`}
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.6)
        ), url(${song.album.images[0].url})`
      }}
      onClick={clickHandler}
    >
      {/* <VoteButton active={isVoted} onClick={onClick} /> */}

      {renderScore()}
      <h3 className="music-tile__song-title">{song.name}</h3>
      <h4 className="music-tile__song-artist">{song.artists[0].name}</h4>
      {/* <h5 className="music-tile__song-duration">{msToMinuteString(song.duration_ms)}</h5> */}
    </div>
  )
};


export default React.memo(MusicTile)
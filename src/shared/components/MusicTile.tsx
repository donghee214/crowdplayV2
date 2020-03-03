import React from "react";
import { Song } from "shared/types";
import { useQuery, useMutation } from "@apollo/react-hooks"
import { ADD_SONG } from "server/Apollo/Mutations"
import { msToMinuteString } from "shared/utils/timeConverter";

interface Props {
  song: Song;
  large: boolean;
  roomId?: string;
}

export default ({ song, large, roomId }: Props) => {
  const [addSong, { data }] = useMutation(ADD_SONG)
  const clickHandler = () => {
    if (song.isRec) {
      addSong({ variables: { roomId, trackId: song.id } })
      // subscribe to more changes to this song 
    }
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
      <h3 className="music-tile__song-score">{song.score}</h3>
      <h3 className="music-tile__song-title">{song.name}</h3>
      <h4 className="music-tile__song-artist">{song.artists[0].name}</h4>
      {/* <h5 className="music-tile__song-duration">{msToMinuteString(song.duration_ms)}</h5> */}
    </div>
  )
};

import React from "react";
import { VoteButton } from "shared";
import { Song } from "shared/types";
import { msToMinuteString } from "shared/utils/timeConverter";

interface Props {
  song: Song;
  isVoted: boolean;
  onClick: () => void;
}

export default ({ song, isVoted, onClick }: Props) => (
  <div
    className="music-tile__container"
    style={{
      backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ), url(${song.album.images[0].url})`
    }}
  >
    <VoteButton active={isVoted} onClick={onClick} />
    <h2>{song.score}</h2>
    <h3 className="music-tile__song-title">{song.name}</h3>
    <h5>{msToMinuteString(song.duration_ms)}</h5>
  </div>
);

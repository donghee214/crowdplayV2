import React, { useState, useEffect } from "react";
import { SpotifySong, Song, Playlist, Album, Artist, Image } from "shared/types";
import { useApolloClient } from "@apollo/react-hooks";
import WithQueueSong from "shared/HOCs/WithQueueSong"

import db from "server/Firestore"

export enum TILE_TYPES {
  TRACK = "track",
  PLAYLIST = "playlist",
  ARTIST = "artist",
  ALBUM = "album",
  ADDED_TRACK = "addedTrack"
}

export interface Props {
  data: SpotifySong | Playlist | Album | Artist;
  large: boolean;
  roomId: string;
  score?: number;
  voters?: string[];
  tileType: TILE_TYPES;
  clicked: boolean;
  setClicked: Function;
  queueSong: Function;
}

interface TileProps {
  clickEvent: Function;
  body: any;
  mainText: string;
  subText: string;
  imageURL: string;
  type: TILE_TYPES;
}


//TODO: REFACTOR INTO A CONTAINER COMPONENT, ONE FOR RECS THE OTHER FOR ADDED SONGS
const MusicTile = ({ data, large, roomId, score, tileType, voters, clicked, setClicked, queueSong }: Props) => {
  const client = useApolloClient();
  const [mouseDown, setMouseDown] = useState(false)
  const [tile, setTile] = useState<TileProps>({
    clickEvent: () => { },
    imageURL: "",
    body: 0,
    mainText: "",
    subText: "",
    type: TILE_TYPES.TRACK
  })

  const upvote = () => {
    const songRef = db
      .firestore()
      .doc(`rooms/${roomId}/songs/${data.id}`)
    songRef.update({
      score: db.firestore.FieldValue.increment(1),
      voters: db.firestore.FieldValue.arrayUnion(document.cookie.split("=")[1])
    })
  }

  const downvote = () => {
    const songRef = db
      .firestore()
      .doc(`rooms/${roomId}/songs/${data.id}`)
    songRef.update({
      score: db.firestore.FieldValue.increment(-1),
      voters: db.firestore.FieldValue.arrayRemove(document.cookie.split("=")[1])
    })
  }

  // POSSIBLY MAKE THIS DEPENDENT ON STATE TILE AS OPPOSED TO RECEIVING PROPS? NEED TO FIGURE OUT STALE PROPS ISSUE
  const expandModal = ({ mainText, subText, imageURL, type }: TileProps) => {
    console.log('called!!', data)
    // expand modal to songs in the playlist, artist, or album
    client.writeData({
      data: {
        browse: {
          href: data.href,
          id: data.id,
          primaryLabel: mainText,
          secondaryLabel: subText,
          image: imageURL,
          type,
          active: true,
          album: type === TILE_TYPES.ALBUM ? data : { images: { height: null, width: null, url: null } }
        }
      }
    })
  }



  useEffect(() => {
    const getOptimalImage = (arrOfImages: Image[]) => {
      if (!arrOfImages || !arrOfImages.length) return ""
      if (large && arrOfImages.length >= 2) {
        console.log(arrOfImages)
        return arrOfImages.slice(-2)[0].url
      }
      return arrOfImages.slice(-1)[0].url
    }
    switch (tileType) {
      case (TILE_TYPES.ADDED_TRACK):
        const clicked = voters && voters.includes(document.cookie.split("=")[1])
        setClicked(clicked ? true : false)
        data = data as SpotifySong
        setTile({
          clickEvent: ({ clicked }: { clicked: boolean }) => clicked ? downvote() : upvote(),
          body: (score || 0),
          mainText: data.name,
          subText: data.artists[0].name,
          imageURL: getOptimalImage(data.album.images),
          type: TILE_TYPES.ADDED_TRACK
        })
        break
      case (TILE_TYPES.TRACK):
        data = data as SpotifySong
        setTile({
          clickEvent: () => queueSong(data),
          body: undefined,
          mainText: data.name,
          subText: data.artists[0].name,
          imageURL: getOptimalImage(data.album.images),
          type: TILE_TYPES.TRACK
        })
        break
      case (TILE_TYPES.ALBUM):
        const album = data as Album
        setTile({
          clickEvent: expandModal,
          body: undefined,
          mainText: album.name,
          subText: album.artists[0].name,
          imageURL: getOptimalImage(album.images),
          type: TILE_TYPES.ALBUM
        })
        break
      case (TILE_TYPES.PLAYLIST):
        const playlist = data as Playlist
        setTile({
          clickEvent: expandModal,
          body: undefined,
          mainText: playlist.name,
          subText: playlist.owner.display_name,
          imageURL: getOptimalImage(playlist.images),
          type: TILE_TYPES.PLAYLIST
        })
        break
      case (TILE_TYPES.ARTIST):
        const artist = data as Artist
        setTile({
          clickEvent: expandModal,
          body: undefined,
          mainText: artist.name,
          subText: artist.genres ? artist.genres[0] : "",
          imageURL: getOptimalImage(artist.images!),
          type: TILE_TYPES.ARTIST
        })
        break
      default:
        throw ("unrecognized tile type!")
    }
  }, [data, clicked])

  const getBackgroundImage = () => {
    if (clicked) {
      return `linear-gradient(
        rgba(155, 155, 0, 0),
        rgba(0, 0, 0, 0.6)
      ), url(${tile.imageURL})`
    }
    return `linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.6)
    ), url(${tile.imageURL})`
  }

  return (
    <div
      className={`${large && "music-tile__container__large"} music-tile__container ${(clicked || mouseDown) && "music-tile__container__clicked"}`}
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.6)
        ), url(${tile.imageURL})`
      }}
      onMouseDown={() => setMouseDown(true)}
      onTouchStart={() => setMouseDown(true)}
      onTouchEnd={() => setMouseDown(false)}
      onMouseUp={() => setMouseDown(false)}
      onClick={() => tile.clickEvent({ ...tile, clicked })}
    >
      <div className={`music-tile__container__pusedo ${(clicked || mouseDown) && "music-tile__container__puesdo__clicked"}`} />
      <div className={"music-tile__container__flex"}>
        <h3 className="music-tile__song-score">
          {tile.body}
        </h3>
        <h3 className="music-tile__song-title">{tile.mainText}</h3>
        <h4 className="music-tile__song-artist">{tile.subText}</h4>
      </div>
      {/* <h5 className="music-tile__song-duration">{msToMinuteString(song.duration_ms)}</h5> */}
    </div>
  )
};


export default WithQueueSong(MusicTile)
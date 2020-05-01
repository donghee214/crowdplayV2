import React from "react"
import { SpotifySong } from "shared/types"
import { TILE_TYPES } from "shared/components/MusicTile"
import { Artist } from "shared/types"
import { msToMinuteString } from "shared/utils/timeConverter"
import WithQueueSong from "shared/HOCs/WithQueueSong"

interface SongListItemProps {
    data: SpotifySong;
    image: string | undefined;
    type: TILE_TYPES;
    clicked: boolean;
    setClicked: Function;
    queueSong: Function;
}

const SongListItem: React.FC<SongListItemProps> = ({ data, image, clicked, setClicked, queueSong }) => (
    <div className="browseSongs__listitem__container" onClick={() => queueSong(data)}>
        <div className="browseSongs__listitem__imageContainer" style={{
            backgroundImage: `url(${data.album ? data.album.images[data.album.images.length - 1].url : image})`
        }} />
        <div className="browseSongs__listitem__nameContent">
            <div className="browseSongs__listitem__textContainer">
                <h3 className={`browseSongs__listitem__songTitle ${clicked && "browseSongs__listitem__songTitle__clicked"}`}>
                    {data.name}
                </h3>
                <h4 className={`browseSongs__listitem__songArtist ${clicked && "browseSongs__listitem__songTitle__clicked"}`}>
                    {data.artists.map((artist: Artist) => artist.name).join(", ")}
                </h4>
            </div>
            <h3 className={`browseSongs__listitem__duration ${clicked && "browseSongs__listitem__songTitle__clicked"}`}>
                {msToMinuteString(data.duration_ms)}
            </h3>
        </div>
    </div>
)



export default WithQueueSong(SongListItem)
import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useLazyQuery } from "@apollo/react-hooks"
import { GET_ALBUM_TRACKS, GET_PLAYLIST_TRACKS, GET_ARTIST_TRACKS } from "server/Apollo/Queries"
import { CSSTransition } from "react-transition-group";
import { useApolloClient } from "@apollo/react-hooks";
import { TILE_TYPES } from "shared/components/MusicTile"
import { SpotifySong } from "shared/types"
import Loading from "shared/components/Loading"
import SongListItem from "features/browse/SongListItem"
import { browseInfoQuery } from "root/features/browse/BrowseSongsContainer"
import Exit from "assets/svgs/Exit"

interface BrowseSongsProps {
    setRender: Function,
    requestInfoData: browseInfoQuery
}

const BrowseSongs: React.FC<BrowseSongsProps> = ({ setRender, requestInfoData }) => {
    const client = useApolloClient()

    const [getAlbumTracks, { loading: albumTracksLoading, data: albumTracks }] = useLazyQuery<{ album: { tracks: SpotifySong[] } }>(GET_ALBUM_TRACKS)
    const [getPlaylistTracks, { loading: playlistTracksLoading, data: playlistTracks }] = useLazyQuery<{ playlist: { tracks: SpotifySong[] } }>(GET_PLAYLIST_TRACKS)
    const [getArtistTracks, { loading: artistTracksLoading, data: artistTracks }] = useLazyQuery<{ artist: { tracks: SpotifySong[] } }>(GET_ARTIST_TRACKS)


    const close = () => {
        client.writeData({
            data: {
                browse: {
                    active: false
                }
            }
        })
    }

    useEffect(() => {
        if (!requestInfoData?.browse.active) return
        switch (requestInfoData.browse.type) {
            case (TILE_TYPES.ALBUM):
                getAlbumTracks({
                    variables: {
                        albumId: requestInfoData!.browse.id
                    }
                })
                break
            case (TILE_TYPES.PLAYLIST):
                getPlaylistTracks({
                    variables: {
                        playlistId: requestInfoData!.browse.id
                    }
                })
                break
            case (TILE_TYPES.ARTIST):
                getArtistTracks({
                    variables: {
                        artistId: requestInfoData!.browse.id
                    }
                })
                break
            default:
                console.error("TILE_TYPE DID NOT MATCH ANY SUPPORTED TYPES")
        }
    }, [requestInfoData?.browse.id])

    const renderTracks = (tracks: SpotifySong[], type: TILE_TYPES) => (
        tracks.map((track) => (
            track ?
                <SongListItem
                    key={track.id}
                    data={{ ...track, album: track.album ? track.album : requestInfoData.browse.album }}
                    type={type}
                    image={requestInfoData?.browse.image}
                />
                : null
        )
        )
    )

    return (
        <CSSTransition
            unmountOnExit={true}
            appear={true}
            in={requestInfoData.browse.active}
            timeout={500}
            onExited={() => setRender(false)}
            classNames="fade-animation">
            <div className="browseSongs__container">
                <Exit classNameText="browseSongs__exit" onClick={close} />
                <div className="browseSongs__background-image" style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0.4)100%), url(${requestInfoData && requestInfoData.browse.image})`
                }} onClick={close} />
                <div className="browseSongs__image" style={{
                    backgroundImage: `url(${requestInfoData && requestInfoData.browse.image})`
                }} />
                <div className="browseSongs__songs__container">
                    {
                        (artistTracksLoading || playlistTracksLoading || albumTracksLoading) &&
                        <div className="browseSongs__loading__container">
                            <Loading classNameText={"browseSongs__loading"} />
                        </div>
                    }
                    {albumTracks && renderTracks(albumTracks.album.tracks, TILE_TYPES.ALBUM)}
                    {playlistTracks && renderTracks(playlistTracks.playlist.tracks, TILE_TYPES.PLAYLIST)}
                    {artistTracks && renderTracks(artistTracks.artist.tracks, TILE_TYPES.ARTIST)}
                </div>
            </div>
        </CSSTransition>
    )

}

export default BrowseSongs
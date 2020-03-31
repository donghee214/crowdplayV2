import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Song, SpotifySong } from "shared/types"
import Loading from "shared/components/Loading"
import CurrentlyPlaying from "features/votingRoom/CurrentlyPlaying"
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { GET_SONG_RECS, GET_ROOM, GET_SONGS } from "server/Apollo/Queries"
import Refresh from "assets/svgs/Refresh"

interface RecSongsProps {
    songToTile: Function
}


const RecSongs: React.FC<RecSongsProps> = ({ songToTile }) => {
    let { loading, data, error, refetch } = useQuery(GET_SONG_RECS, { variables: { seed: ["dance"] }, notifyOnNetworkStatusChange: true })
    return (
        <React.Fragment>
            <div className="votingroom_titleLabel-container">
                <div style={{ textAlign: 'left' }}>
                    <h2 style={{ fontSize: '1.4rem' }}>
                        Recommended songs
                    </h2>
                    <h4 style={{ marginTop: '-1px' }}>
                        Based on songs in this playlist
                    </h4>
                </div>
                <div className="votingroom_addSong-container" onClick={() => refetch()}>
                    <Refresh />
                </div>
            </div>
            {loading ?
                <div className="votingroom_loading-container"><Loading classNameText={"votingroom-loading"} /></div>
                :
                <div className="votingroom_song-container">
                    {data && songToTile({
                        songs: data.songRecs.map((song: SpotifySong) => {
                            return {
                                trackId: song.id,
                                song: song
                            } as Song
                        }), isRec: true
                    })}
                </div>
            }

        </React.Fragment>

    )
}

export default React.memo(RecSongs)
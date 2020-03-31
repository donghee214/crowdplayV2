import React, { useState, useEffect } from "react"
import { useLazyQuery } from '@apollo/react-hooks';
import AddSong from "assets/svgs/AddSong"
import Input from "shared/components/Input"
import { GET_SEARCH } from "server/Apollo/Queries"
import { SpotifySong, Playlist, Album, Artist } from "shared/types"
import Loading from "shared/components/Loading"

interface SearchSongsContainerProps {
    setIsSearch: Function;
}

interface dataProps {
    search: {
        artists: Artist[],
        albums: Album[],
        playlists: Playlist[],
        tracks: SpotifySong[]
    }
}

const SearchSongsContainer: React.FC<SearchSongsContainerProps> = ({ setIsSearch }) => {
    const [runQuery, { called, loading, data, error }] = useLazyQuery<dataProps>(GET_SEARCH)
    const [searchTerm, setSearchTerm] = useState<string>("")


    const updateSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }

    useEffect(() => {
        if (searchTerm) {
            runQuery({
                variables: { query: searchTerm, limit: 10 }
            })
        }
    }, [searchTerm])

    const songToTile = () => {
        return <div />
    }

    const renderSearchContent = () => {
        if (loading) {
            return (
                <div className="votingroom_loading-container">
                    <Loading classNameText={"votingroom-loading"} />
                </div>
            )
        }
        if (!searchTerm) {
            return (
                <div className="votingroom-noResultMesaage">
                    <h2>
                        Search for anything
                    </h2>
                    <h4 style={{ marginTop: "4px" }}>
                        Songs, playlists, artists, or albums!
                    </h4>
                </div>
            )
        }
        if (data && data.search.artists.length + data.search.albums.length + data.search.playlists.length + data.search.tracks.length === 0) {
            return (
                <div className="votingroom-noResultMesaage">
                    <h2>
                        Couldn't find "{searchTerm}"
                    </h2>
                    <h4 style={{ marginTop: "4px" }}>
                        Try searching agains using a different spelling or keyword.
                    </h4>
                </div>
            )
        }
        else {
            return songToTile()
        }
    }



    return (
        <div>
            <div className="votingroom_titleLabel-container">
                <div style={{ textAlign: 'left' }}>
                    <Input
                        onChangeCallback={updateSearchTerm}
                        value={searchTerm}
                        focusOnRender={true}
                    />
                </div>
                <div className="votingroom_addSong-container" onClick={() => setIsSearch(false)}>
                    <AddSong />
                </div>
            </div>
            <div className="votingroom_song-container">
                {renderSearchContent()}
            </div>
        </div>

    )
}

export default SearchSongsContainer
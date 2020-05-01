import React, { useState, useEffect, Component, FunctionComponentElement } from "react"
import { useLazyQuery } from '@apollo/react-hooks';
import useDebounce from "shared/utils/useDebounce"
import AddSong from "assets/svgs/AddSong"
import Input from "shared/components/Input"
import { GET_SEARCH } from "server/Apollo/Queries"
import { SpotifySong, Playlist, Album, Artist } from "shared/types"
import Loading from "shared/components/Loading"
import MusicTile, { TILE_TYPES } from "shared/components/MusicTile";
import { CSSTransition } from "react-transition-group";
import Button from "shared/components/Button"

interface SearchSongsContainerProps {
    setIsSearch: Function;
    roomId: string;
}

interface dataProps {
    search: {
        artists: Artist[],
        albums: Album[],
        playlists: Playlist[],
        tracks: SpotifySong[]
    }
}

const SearchSongsContainer: React.FC<SearchSongsContainerProps> = ({ setIsSearch, roomId }) => {
    const [runQuery, { called, loading, data, error, }] = useLazyQuery(GET_SEARCH, {
        fetchPolicy: "no-cache"
    })
    const [searchTerm, setSearchTerm] = useState("")
    const [tiles, setTiles] = useState<FunctionComponentElement<dataProps>[]>([])
    const [debouncedSearchTerm, setBouncedSearchTerm] = useDebounce(searchTerm, 300, () => runQuery({
        variables: { query: searchTerm, limit: 10 },
    }))

    const getSumOfSongs = (data: dataProps) => {
        if (!data) return 0
        return data.search.albums.length + data.search.artists.length + data.search.playlists.length + data.search.tracks.length
    }

    const updateSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
        if (!e.currentTarget.value) setBouncedSearchTerm("")
    }

    useEffect(() => {
        if (data) {
            setTiles(songToTile(data))
        }
    }, [data])

    const randomWithTrackBias = (data: dataProps, reverseBias = false): {
        data: any,
        type: TILE_TYPES
    } | undefined => {
        const regenSeed = () => {
            for (let i = 0; i < 4; i++) {
                if (map[i].length) return i
            }
            return 4
        }
        let randomSeed = reverseBias ? Math.floor(Math.random() * 3) : 0
        let map = [
            reverseBias ? data.search.albums : data.search.tracks,
            data.search.playlists,
            data.search.artists,
            reverseBias ? data.search.tracks : data.search.albums
        ]
        if (map[randomSeed].length === 0) {
            randomSeed = regenSeed()
        }

        switch (randomSeed) {
            case (0):
                if (map[0].length) {
                    return {
                        data: map[0].shift(),
                        type: reverseBias ? TILE_TYPES.ALBUM : TILE_TYPES.TRACK
                    }
                }
            case (1):
                if (map[1].length) {
                    return {
                        data: map[1].shift(),
                        type: TILE_TYPES.PLAYLIST
                    }
                }
            case (2):
                if (map[2].length) {
                    return {
                        data: map[2].shift(),
                        type: TILE_TYPES.ARTIST
                    }
                }
            case (3):
                if (map[3].length) {
                    return {
                        data: map[3].shift(),
                        type: reverseBias ? TILE_TYPES.TRACK : TILE_TYPES.ALBUM
                    }
                }
            default:
                return undefined
        }
    }

    const songToTile = (data: dataProps) => {
        const addTile = (
            ret: React.FunctionComponentElement<dataProps>[],
            large: boolean,
            data: SpotifySong | Playlist | Album | Artist,
            type: TILE_TYPES
        ) => {
            ret.push(
                <MusicTile
                    key={data.id}
                    data={data}
                    large={large}
                    roomId={roomId}
                    tileType={type}
                />
            )
        }
        let nextLargePortrait = 1
        let addition = 7
        const ret: React.FunctionComponentElement<dataProps>[] = []
        for (let i = 0; i < Math.min(26, getSumOfSongs(data)); i++) {
            if (i == nextLargePortrait) {
                if (addition == 7) {
                    addition = 5
                }
                else {
                    addition = 7
                }
                nextLargePortrait += addition
                const tileInfo = randomWithTrackBias(data, true)
                addTile(ret, true, tileInfo!.data, tileInfo!.type)
            }
            else {
                const tileInfo = randomWithTrackBias(data, false)
                addTile(ret, false, tileInfo!.data, tileInfo!.type)
            }
        }
        return ret
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
                <Button
                    className={"votingroom_addSong-container"}
                    mouseDownClassName={"votingroom_addSong-container_mouseDown"}
                    callback={() => setIsSearch(false)}
                >
                    <AddSong className={'addSong-rotate'} />
                </Button>
            </div>
            <CSSTransition
                appear={true}
                unmountOnExit={true}
                in={loading}
                timeout={400}
                classNames="fade-animation">
                <div className="votingroom_loading-container">
                    <Loading classNameText={"votingroom-loading"} />
                </div>
            </CSSTransition>
            <CSSTransition
                appear={true}
                unmountOnExit={true}
                in={!searchTerm}
                timeout={400}
                classNames="fade-animation">
                <div className="votingroom-noResultMesaage">
                    <h2>
                        Search for anything
                    </h2>
                    <h4 style={{ marginTop: "4px" }}>
                        Songs, playlists, artists, or albums!
                    </h4>
                </div>
            </CSSTransition>
            <CSSTransition
                appear={true}
                unmountOnExit={true}
                in={data && getSumOfSongs(data) === 0}
                timeout={400}
                classNames="fade-animation">
                <div className="votingroom-noResultMesaage">
                    <h2>
                        Couldn't find "{searchTerm}"
                    </h2>
                    <h4 style={{ marginTop: "4px" }}>
                        Try searching agains using a different spelling or keyword.
                    </h4>
                </div>
            </CSSTransition>
            <CSSTransition
                appear={true}
                unmountOnExit={true}
                in={!loading && debouncedSearchTerm.length > 0 && data && getSumOfSongs(data) > 0}
                timeout={400}
                classNames="fade-animation-addedSongs">
                <div className="votingroom_song-container">
                    {tiles}
                </div>
            </CSSTransition>
        </div >

    )
}

export default SearchSongsContainer
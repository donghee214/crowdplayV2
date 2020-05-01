import React, { useEffect, useState } from "react"
import BrowseSongs from "features/browse/BrowseSongs"
import { useQuery } from "@apollo/react-hooks"
import { TILE_TYPES } from "shared/components/MusicTile"
import { GET_BROWSE_INFO } from "server/Apollo/Queries"
import { Album } from "shared/types"

export interface browseInfoQuery {
    browse: {
        href: string;
        id: string;
        primaryLabel: string;
        secondaryLabel: string;
        image: string;
        active: boolean;
        type: TILE_TYPES;
        album?: Album;
    }
}


const BrowseSongsContainer = () => {
    const { loading: requestInfoDataLoading, data: requestInfoData } = useQuery<browseInfoQuery>(GET_BROWSE_INFO)
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (requestInfoData?.browse.active) setRender(true)
    }, [requestInfoData?.browse.active])

    return (
        <React.Fragment>
            {render && requestInfoData && <BrowseSongs setRender={setRender} requestInfoData={requestInfoData} />}
        </React.Fragment>

    )
}

export default BrowseSongsContainer
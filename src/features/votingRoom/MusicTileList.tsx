import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useLazyQuery } from '@apollo/react-hooks';
import { Song } from "shared/types"
import db from "server/Firestore"
import AddSong from "assets/svgs/AddSong"
import { CSSTransition } from "react-transition-group";
import Loading from "shared/components/Loading"
import Input from "shared/components/Input"
import { GET_SEARCH } from "server/Apollo/Queries"

interface AddedSongsProps {
    songToTile: Function;
    loading: boolean
}


//TODO: REFACTOR THIS TO SEPERATE SEARCH AND VOTING SONG FUNCTIONALITY BETTER
const AddedSongs: React.FC<AddedSongsProps> = ({
    songToTile,
    loading
}) => {


    const [showVotingSongs, setShowVotingSongs] = useState<boolean>(true)




    return (
        <React.Fragment>



        </React.Fragment>

    )
}

export default React.memo(AddedSongs)
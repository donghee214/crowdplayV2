import React from "react"
import { withRouter, RouteComponentProps } from "react-router"
import MusicTile from "shared/components/MusicTile"

interface VotingRoomProps extends RouteComponentProps {

}

const VotingRoom: React.FC<VotingRoomProps> = ({
    history
}) => {
    return (
        <div>

        </div>
    )
}

export default withRouter(React.memo(VotingRoom))
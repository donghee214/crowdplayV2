import React, { PureComponent } from "react";
import MusicTile from "shared/components/MusicTile";
import songData from "../../mocks/songData.json";

export default class MusicTileContainer extends PureComponent {
  render() {
    const dumbySong = songData;
    return (
      <div>
        <MusicTile song={dumbySong} />
      </div>
    );
  }
}

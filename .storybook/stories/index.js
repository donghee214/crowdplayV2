import React from "react";
import { storiesOf } from "@storybook/react";
import VoteButtonContainer from "./components/VoteButton";
import MusicTileContainer from "./components/MusicTile";
import centerContent from "../decorators/center";
import "assets/App.css";

storiesOf("Shared", module)
  .addDecorator(centerContent)
  .add("Vote Button", () => <VoteButtonContainer />)
  .add("Music Tile", () => <MusicTileContainer />);

import React from "react";
import { storiesOf } from "@storybook/react";
import VoteButtonContainer from "./components/VoteButton";
import MusicTileContainer from "./components/MusicTile";
import centerContent from "../decorators/center";
import HomeScreen from "features/onboarding/HomeScreen";
import CreateJoinRoomScreen from 'features/onboarding/CreateJoinRoomScreen';

import 'assets/App.css';

storiesOf('Shared', module)
  .addDecorator(centerContent)
  .add("Vote Button", () => <VoteButtonContainer />)
  .add("Music Tile", () => <MusicTileContainer />)
  .add("VoteButton", () => <VoteButtonContainer />);

storiesOf("HomeScreen", module).add("Default", () => <HomeScreen />);

storiesOf('CreateJoinRoomScreen', module)
  .add('Create room', () => <CreateJoinRoomScreen type="CREATE" />)
  .add('Join room', () => <CreateJoinRoomScreen type="JOIN" />);

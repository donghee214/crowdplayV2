import React from 'react';
import { storiesOf } from '@storybook/react';
import VoteButtonContainer from './components/VoteButton';
import MusicTileContainer from './components/MusicTile';
import centerContent from '../decorators/center';
import HomeScreen from 'features/onboarding/HomeScreen';
import CreateJoinRoomScreen from 'features/onboarding/CreateJoinRoomScreen';
import { BrowserRouter as Router } from 'react-router-dom';

import 'assets/App.css';

storiesOf('Shared', module)
  .addDecorator(centerContent)
  .add('Vote Button', () => <VoteButtonContainer />)
  .add('Music Tile', () => <MusicTileContainer />)
  .add('VoteButton', () => <VoteButtonContainer />);

storiesOf('HomeScreen', module).add('Default', () => (
  <Router>
    <HomeScreen />
  </Router>
));

storiesOf('CreateJoinRoomScreen', module)
  .add('Create room', () => (
    <Router>
      <CreateJoinRoomScreen type="CREATE" />
    </Router>
  ))
  .add('Join room', () => (
    <Router>
      <CreateJoinRoomScreen type="JOIN" />
    </Router>
  ));

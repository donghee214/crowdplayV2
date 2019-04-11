import React from 'react';
import { storiesOf } from '@storybook/react';
import VoteButtonContainer from './components/VoteButton';
import centerContent from '../decorators/center';
import HomeScreen from 'root/HomeScreen';
import CreateJoinRoomScreen from 'shared/components/CreateJoinRoomScreen';

import 'assets/App.css';

storiesOf('Shared', module)
  .addDecorator(centerContent)
  .add('VoteButton', () => <VoteButtonContainer />);

storiesOf('HomeScreen', module).add('Default', () => <HomeScreen />);

storiesOf('CreateJoinRoomScreen', module)
  .add('Create room', () => <CreateJoinRoomScreen type="CREATE" />)
  .add('Join room', () => <CreateJoinRoomScreen type="JOIN" />);

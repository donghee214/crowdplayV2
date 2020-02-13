import React from 'react';
import HomeScreen from 'features/onboarding/HomeScreen';
import VotingRoom from 'features/votingRoom/VotingRoom'

export const APP_PATHS = {
  HOME_SCREEN: '/',
  CREATE_ROOM: '/create',
  JOIN_ROOM: '/join',
  VOTING_ROOM: '/voting_room'
};

export default [
  {
    path: APP_PATHS.HOME_SCREEN,
    render: () => <HomeScreen />,
    exact: true
  },
  {
    path: APP_PATHS.VOTING_ROOM,
    render: () => <VotingRoom />,
    exact: false
  }
];

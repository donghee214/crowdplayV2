import React from 'react';
import HomeScreen from 'features/onboarding/HomeScreen';
import CreateJoinRoomScreen from 'features/onboarding/CreateJoinRoomScreen';

export const APP_PATHS = {
  HOME_SCREEN: '/',
  CREATE_ROOM: '/create',
  JOIN_ROOM: '/join'
};

export default [
  {
    path: APP_PATHS.HOME_SCREEN,
    render: () => <HomeScreen />,
    exact: true
  },
  {
    path: APP_PATHS.CREATE_ROOM,
    render: () => <CreateJoinRoomScreen type="CREATE" />,
    exact: true
  },
  {
    path: APP_PATHS.JOIN_ROOM,
    render: () => <CreateJoinRoomScreen type="JOIN" />,
    exact: true
  }
];

import React from 'react';
import HomeScreen from 'features/onboarding/HomeScreen';

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
  }
];

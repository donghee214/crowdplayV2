import React, { Component } from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import UUIDGenerator from "shared/utils/UUIDGenerator"
import HomeScreen from 'features/onboarding/HomeScreen';
import VotingRoom from 'features/votingRoom/VotingRoom'
import client from "server/Apollo/Apollo"
import { ApolloProvider } from '@apollo/react-hooks';

const APP_PATHS = {
  HOME_SCREEN: '/',
  CREATE_ROOM: '/create',
  JOIN_ROOM: '/join',
  VOTING_ROOM: '/voting_room'
};

const App = () => {
  const doesHaveCookie = () => {
    return document.cookie.split(';').filter(item => {
      return item.includes('browserID=')
    }).length
  }
  if (!doesHaveCookie()) {
    document.cookie = `browserID=${UUIDGenerator()}`
  }
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route exact path={APP_PATHS.HOME_SCREEN} component={HomeScreen} />
          <Route path={APP_PATHS.VOTING_ROOM} component={VotingRoom} />
        </BrowserRouter>
      </ApolloProvider>

    </div>
  );

}

export default App;

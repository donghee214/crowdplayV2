import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from 'root/routes';
import client from "server/Apollo/Apollo"
import { ApolloProvider } from '@apollo/react-hooks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <BrowserRouter>
            {routes.map(routeProps => (
              <Route key={routeProps.path} {...routeProps} />
            ))}
          </BrowserRouter>
        </ApolloProvider>

      </div>
    );
  }
}

export default App;

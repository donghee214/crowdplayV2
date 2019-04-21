import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Firestore from './server/Firestore';
import routes from 'root/routes';

class App extends Component {
  render() {
    Firestore.collection('users-test')
      .add({ name: 'Justy Wusty', phoneNumber: '647-911-9111' })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    return (
      <div className="App">
        <BrowserRouter>
          {routes.map(routeProps => (
            <Route key={routeProps.path} {...routeProps} />
          ))}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

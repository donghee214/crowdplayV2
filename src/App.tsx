import React, { Component } from 'react';
import Firestore from './server/Firestore';




class App extends Component {

  render() { 
    Firestore.collection("users-test").add({name:"Justy Wusty", phoneNumber: "647-911-9111"})
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Remove google cloud build!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

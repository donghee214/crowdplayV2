import React, { Component } from "react";
import Firestore from "./server/Firestore";
import { VoteButton } from "shared";
import HomeScreen from "./HomeScreen";

class App extends Component {
  render() {
    Firestore.collection("users-test")
      .add({ name: "Justy Wusty", phoneNumber: "647-911-9111" })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    return (
      <div className="App">
        <HomeScreen />
      </div>
    );
  }
}

export default App;

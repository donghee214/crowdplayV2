import React, { Component } from "react";
import Firestore from "./server/Firestore";
import HomeScreen from "features/onboarding/HomeScreen";
import CreateJoinRoomScreen from 'features/onboarding/CreateJoinRoomScreen';
import { totalmem } from 'os';

class App extends Component {
  state = {
    show: ''
  };

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
        {/* TODO: Temporary... remove this once we set up react router.  */}
        {this.state.show === 'Create' && <CreateJoinRoomScreen type="CREATE" />}
        {this.state.show === 'Join' && <CreateJoinRoomScreen type="JOIN" />}
        {this.state.show === '' && (
          <HomeScreen
            onClickHandler={title => {
              this.setState({ show: title });
              return true;
            }}
          />
        )}
      </div>
    );
  }
}

export default App;

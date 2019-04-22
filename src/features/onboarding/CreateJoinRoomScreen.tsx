import React, { Component, Fragment } from 'react';

import PencilIcon from 'assets/images/PencilIcon';
import QuestionMarkIcon from 'assets/images/QuestionMarkIcon';

interface Props {
  type: string;
}

interface State {
  input: string;
}
// TODO: Add animation to make the create/join room screen expand from the middle outwards.
export default class CreateJoinRoomScreen extends Component<Props> {
  state = {
    roomName: ''
  };

  render() {
    let placeholder;
    let buttonTitle;
    let icon;

    if (this.props.type === 'CREATE') {
      placeholder = 'Create room name';
      buttonTitle = 'Create';
      icon = <PencilIcon size="100" />;
    } else {
      placeholder = 'Enter room name';
      buttonTitle = 'Join';
      icon = <QuestionMarkIcon size="100" />;
    }

    return (
      <div className="createJoinRoom">
        <div className="createJoinRoom__app-name type--small-white-bold">
          Crowdplay V2
        </div>
        <form
          onSubmit={evt => {
            evt.preventDefault();
            alert(`Submitted ${this.state.roomName}`);
          }}
          className="createJoinRoom__content"
        >
          {icon}
          <div className="createJoinRoom__content__input-field">
            <input
              type="text"
              placeholder={placeholder}
              value={this.state.roomName}
              onChange={evt => {
                this.setState({ roomName: evt.target.value });
              }}
            />
          </div>
          <button
            className="createJoinRoom__content__button btn type--large-white"
            disabled={!this.state.roomName}
          >
            {buttonTitle}
            <span className="type--large-green">.</span>
          </button>
        </form>
      </div>
    );
  }
}

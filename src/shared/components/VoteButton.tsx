import React, { PureComponent } from 'react';
import UpArrow from 'assets/svgs/UpArrow';

interface Props {
  active: boolean;
  onClick: () => void;
}

interface State {
  currentAnimation: string;
}

export default class extends PureComponent<Props, State> {
  state = {
    currentAnimation: ''
  };

  onClick = () => {
    this.setState({ currentAnimation: '' });
    this.props.active
      ? this.setState({ currentAnimation: 'cbutton--unclick' })
      : this.setState({ currentAnimation: 'cbutton--click' });
    this.props.onClick();
  };

  render() {
    return (
      <button
        onClick={this.onClick}
        className={`cbutton cbutton--effect-ivana ${
          this.state.currentAnimation
        }`}
      >
        <UpArrow active={this.props.active} />
      </button>
    );
  }
}

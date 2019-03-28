import React, { PureComponent } from "react";

interface Props {
  active: boolean;
  clickHandler: () => void;
}

interface State {
  currentAnimation: string;
}

export default class extends PureComponent<Props, State> {
  state = {
    currentAnimation: ""
  };

  onClick = () => {
    this.setState({ currentAnimation: "" });
    this.props.active
      ? this.setState({ currentAnimation: "cbutton--unclick" })
      : this.setState({ currentAnimation: "cbutton--click" });
    this.props.clickHandler();
  };

  render() {
    return (
      <button
        onClick={this.onClick}
        className={`cbutton cbutton--effect-ivana ${
          this.state.currentAnimation
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={`voteButton ${
            this.props.active ? "voteButton--active" : "voteButton--unactive"
          }`}
        >
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    );
  }
}

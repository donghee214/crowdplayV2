import React, { PureComponent } from "react";
// import VoteButton from "shared/components/VoteButton";
import VoteButton from "shared/components/VoteButton";
export default class VoteButtonContainer extends PureComponent {
  state = {
    active: false
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ textAlign: "center" }}>
          <VoteButton
            active={false}
            clickHandler={() => console.log("dummy")}
          />
          <p>Unactive</p>
        </div>
        <div style={{ textAlign: "center", margin: "0 2rem" }}>
          <VoteButton active={true} clickHandler={() => console.log("dummy")} />
          <p>Active</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <VoteButton
            active={this.state.active}
            clickHandler={() => this.setState({ active: !this.state.active })}
          />
          <p>Interactive</p>
        </div>
      </div>
    );
  }
}

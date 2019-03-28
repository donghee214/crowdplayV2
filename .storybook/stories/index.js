import React from "react";
import { storiesOf } from "@storybook/react";
import VoteButtonContainer from "./components/VoteButton.js";
// import VoteButton from "shared/components/VoteButton";
import centerContent from "../decorators/center.tsx";
import "assets/App.css";

storiesOf("Shared", module)
  .addDecorator(centerContent)
  .add("VoteButton", () => <VoteButtonContainer />);

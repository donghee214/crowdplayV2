import React from "react";
import { storiesOf } from "@storybook/react";
import VoteButtonContainer from "./components/VoteButton";
import centerContent from "../decorators/center";
import HomeScreen from "root/HomeScreen";

import "assets/App.css";

storiesOf("Shared", module)
  .addDecorator(centerContent)
  .add("VoteButton", () => <VoteButtonContainer />);

storiesOf("HomeScreen", module).add("Default", () => <HomeScreen />)


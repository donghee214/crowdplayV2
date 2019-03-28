import { configure } from "@storybook/react";
import VoteButton from "shared/components/VoteButton";

function loadStories() {
  console.log(VoteButton);
  require("./stories/index.js");
}

configure(loadStories, module);

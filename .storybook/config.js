import { configure } from "@storybook/react";
import VoteButton from "shared/components/VoteButton";

function loadStories() {
  require("./stories/index.js");
}

configure(loadStories, module);

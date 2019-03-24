import React from "react";
import { storiesOf } from "@storybook/react";
import VoteButton from "shared/components/VoteButton.tsx";

storiesOf("Shared/VoteButton", module).add("Active", () => <VoteButton />);

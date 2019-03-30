import React from "react";

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#333"
};

export default (storyFn: Function) => (
  <div style={centerStyle}>{storyFn()}</div>
);

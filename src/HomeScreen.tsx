import React, { Component } from 'react';

import { VoteButton } from 'shared';

// TODO: smh think of a better name lol
const BoxInput = ({
  title,
  iconClassname,
  onClickHandler
}: {
  title: string;
  iconClassname: string;
  onClickHandler: (title: string) => boolean;
}) => (
  <button
    className="btn home-screen__box-input"
    onClick={() => onClickHandler(title)}
  >
    <div className={iconClassname} />
    <div className="type--large-white">
      {title}
      <span className="type--large-green">.</span>
    </div>
  </button>
);

interface HomeScreen {
  onClickHandler: (title: string) => boolean;
}
const HomeScreen = ({ onClickHandler }: HomeScreen) => (
  <div className="home-screen">
    <div>
      <div className="type--large-white">CrowdSource</div>
      <div className="type--large-white">Democratize your playlist</div>
    </div>

    <div className="home-screen__boxes-container">
      <BoxInput
        title="Create"
        iconClassname="home-screen__create-room__icon"
        onClickHandler={onClickHandler}
      />
      <BoxInput
        title="Join"
        iconClassname="home-screen__join-room__icon"
        onClickHandler={onClickHandler}
      />
    </div>

    <VoteButton active={true} clickHandler={() => console.log('dummy')} />
  </div>
);

export default HomeScreen;

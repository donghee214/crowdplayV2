import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APP_PATHS } from 'root/routes';
import PencilIcon from 'assets/images/PencilIcon';
import QuestionMarkIcon from 'assets/images/QuestionMarkIcon';

// TODO: smh think of a better name lol
const BoxInput = ({ title }: { title: string }) => (
  <Link
    to={title === 'Create' ? APP_PATHS.CREATE_ROOM : APP_PATHS.JOIN_ROOM}
    className="btn home-screen__box-input"
  >
    {title === 'Create' ? <PencilIcon /> : <QuestionMarkIcon />}
    <div className="type--large-white">
      {title}
      <span className="type--large-green">.</span>
    </div>
  </Link>
);

const HomeScreen = () => (
  <div className="home-screen">
    <div>
      <div className="type--large-white">CrowdSource</div>
      <div className="type--large-white">Democratize your playlist</div>
    </div>

    <div className="home-screen__boxes-container">
      <BoxInput title="Create" />
      <BoxInput title="Join" />
    </div>
  </div>
);

export default HomeScreen;

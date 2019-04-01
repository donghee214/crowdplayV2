import React, { Component } from "react";

import { VoteButton } from "shared";

// TODO: smh think of a better name lol
const BoxInput = ({title, iconClassname}: {title: string, iconClassname: string}) => (
  <button className="btn home-screen__box-input" onClick={() => alert(title)}>
      <div className={iconClassname}/>
      <div className="type--large-white">{title}<span className="type--large-green">.</span></div> 
    </button>
);

const HomeScreen = () => (
  <div className="home-screen">
    <div>
      <div className="type--large-white">CrowdSource</div>
      <div className="type--large-white">Democratize your playlist</div>
    </div>

    <div className="home-screen__boxes-container">
      <BoxInput title="Create" iconClassname="home-screen__create-room__icon"/>
      <BoxInput title="Join" iconClassname="home-screen__join-room__icon"/>
    </div>

    <VoteButton active={true} clickHandler={() => console.log("dummy")} />
  </div>
)
  
export default HomeScreen;

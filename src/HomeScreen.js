import React, { Component } from "react";


// TODO: smh think of a better name lol
const BoxInput = ({title,iconClassname}) => (
  <div className="home-screen__box-input">
      <div className={iconClassname}/>
      <div className="type--large-white">{title}<span className="type--large-green">.</span></div> 
    </div>
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
  </div>
)
  
export default HomeScreen;

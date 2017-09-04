import React, { Component } from 'react';

function Chatbox(props) {
  return (
    <div id="topbar">
        <img id="logoimg" src={'./nchat.png'} />
        <h5>1 Person Currently Chatting <span id="date">Last Message at: Wednesday, September 30th</span></h5>
    </div>
  )
}

export default Chatbox;

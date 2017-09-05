import React, { Component } from 'react';

function Chatbox(props) {
  let chatting;
  const date = props.lastPost.slice(0,10); 
  const time = props.lastPost.slice(11, 19); 
  if (props.users > 1) chatting = props.users + ' People Currently Chatting ';
  else chatting = props.users + ' Person Currently Chatting ';
  return (
    <div id="topbar">
        <img id="logoimg" src={'./nchat.png'} />
        <h5>{chatting}<span id="date">Last Post was {date} at {time}</span></h5>
    </div>
  )
}

export default Chatbox;

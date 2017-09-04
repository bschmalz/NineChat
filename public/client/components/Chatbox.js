import React, { Component } from 'react';

function Chatbox(props) {
  let msgs = '';  
  if (props.messages.length > 0) {
    msgs = props.messages.map((message, i) => {
      return (
        <div key={message._id} className="msgcontainer">
          <p><span className="msgname">{message.src}:</span >{message.content} </p>
        </div>
      )
    });
  } 

  return (
    <div id="chatbox">
      {msgs}
    </div>
  )
}

export default Chatbox;

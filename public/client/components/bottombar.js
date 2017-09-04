import React, { Component } from 'react';

function Bottombar(props) {

  return (
    <div id="bottombar">

      <textarea id="textbox" value={props.value} onChange={(event) => props.handleChange(event)}
        onKeyPress={(event) => props.handleKeyPress(event)} placeholder='message...'
      />

    </div>
  )
}

export default Bottombar;

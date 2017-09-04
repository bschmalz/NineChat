'use strict';

import React, { Component } from 'react'

const UserProfile = (props) => {
  const arr = [props.username, 'bro1', 'bro2', 'bro3']; 
  const names = arr.map(item => {
    return (<li className = "selItem">{item}</li>)
  }); 

  return (
    <div id = "user-profile">
      <h4 id = "curUsers">Current Users</h4>
      <div className="scrollList">
      <ul className = "userList">
        {names}
      </ul>
      </div>
    </div>
  );
}

export default UserProfile;

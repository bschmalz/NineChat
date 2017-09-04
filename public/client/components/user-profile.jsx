'use strict';

import React, { Component } from 'react'

const UserProfile = (props) => {
  const arr = [props.username, 'bro1', 'bro2', 'bro3']; 
  for (let i = 0; i < 30; i++) {
  	arr.push('broseph');
  }
  const names = arr.map(item => {
    return (<li className = "selItem">{item}</li>)
  }); 

  return (
    <div id = "user-profile">
      <h4 id = "curUsers">Current Users</h4>
      <ul className = "userList">
        {names}
      </ul>
    </div>
  );
}

export default UserProfile;

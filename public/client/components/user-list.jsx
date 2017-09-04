'use strict';

import React, { Component } from 'react'

const UserList = (props) => {
  let test = props.friends; 
  for (let i = 4; i < 40; i++) {
  	test.push('friend' + i);
  }
  const friends = props.friends.map(friend => {
  	return (<li className = "selItem">{friend}</li>);
  })

  return (
  	<div id = "friendList">
      <h4> Test </h4>
      <div id="funtext">
      <ul className = "userList">
        {friends}
      </ul>
      </div>
    </div>

  );
}

export default UserList;

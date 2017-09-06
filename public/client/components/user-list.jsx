'use strict';

import React, { Component } from 'react'

const UserList = (props) => {
  let friends; 
  if (props.friends.length === 0) {
    friends = (<li >Double click on a user in the user list to add a friend</li>);
  } else { 
    friends = props.friends.map(friend => {
  	  return (<li key = {friend} className = "selItem">{friend}</li>);
    });
  }
  return (
  	<div id = "friendList">
      <h4> Friend List </h4>
      <div className="scrollList">
      <ul className = "userList">
        {friends}
      </ul>
      </div>
    </div>

  );
}

export default UserList;

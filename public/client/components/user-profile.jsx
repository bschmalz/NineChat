'use strict';

import React, { Component } from 'react'

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let names = []; 
    console.log('user props', this.props)
    if (this.props.users) {
      names = this.props.users.map(name => {
      return (<li key = {name} className = "selItem" onDoubleClick={() => this.props.addFriend(name)} >{name}</li>)
    }); 
  }
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
}

export default UserProfile;

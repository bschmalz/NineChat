'use strict';

import React, { Component } from 'react'

const UserProfile = (props) => {
    return (
        <div id="user-profile">
            <div id="user-username">{props.username}</div>
        </div>
    );
}

export default UserProfile;

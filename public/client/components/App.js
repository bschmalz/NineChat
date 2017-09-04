//import things here
import React, { Component } from 'react';
import Chatbox from './Chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';
import UserList from './user-list.jsx';
import UserProfile from './user-profile.jsx';

const socket = new WebSocket('ws://192.168.0.107:3000/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.sendClick = this.sendClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.parsedUsername = '';
  }

  componentWillMount() {
    const name = parseUsername(document.cookie); 
    this.setState({parsedUsername: name});
  }

  componentDidMount() {
    // before executing the set state below, componentDidMount needs to reach out to
    return socket.onopen = (event) => this.updateMessages();
  }

  updateMessages() {
      let announce = {
      src: this.state.me.username,
      dst: 'ADDUSER',
      content: 'hi',
    };

    socket.send(JSON.stringify(announce));
    socket.onmessage = (event) => {
      let messages = JSON.parse(event.data);
      console.log('getting messages', messages); 
      if (Array.isArray(messages)) messages.reverse();
      const oldMessages = this.state.messages.slice();
      messages = oldMessages.concat(messages);
      this.setState({messages: messages});
      const objDiv = document.getElementById("chatbox");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  getInitialState() {
    //return data from socket.onconnect here, with the return statement below inside the callback for that. 
    //this will hold off on populating ANYTHING until that data comes through.
    //connect ajax to this?
    return {
      messages: [],
      friends: ['friend1', 'friend2', 'friend3'],
      currentChat: { username: '', name: '', photo: '' },
      text: '',
      me: { username: 'GarrettCS', name: 'Garrett', photo: 'test.jpg' }
    };
  }
  sendClick(event) {
    // message is sent to server via web socket,
    // message comes back as confirmed to client
    // client pushes it to messages array (SETS STATE)
    // react rerenders
    //textbox value is reset to null
    let text = this.state.text; 
    if (text === '') return;
    let destination = 'chatroom';
    if (text[0] === '@') {
      let index = text.indexOf(' '); 
      if (index < 0) return; 
      destination = text.slice(1, index);
      text = text.slice(index + 1);
    }
    let aMessage = {
      src: this.state.parsedUsername,
      dst: destination,
      content: text,
    };

    socket.send(JSON.stringify(aMessage));
    this.setState({ text:''});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendClick(event);
    }
  }

  userClick(user) {
    // update messages to reflect current user, this will require a pull from server
    // to server: send my ID, friendsID, should recieve back messages between me and friend, 
    // update state.messages to reflect the new messages.
    const chatter = this.state.friendsList[user];
    this.setState({ currentChat: chatter });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div id="main">
        <div id="chat">
          <Topbar />
          <Chatbox messages={this.state.messages} />
          <Bottombar handleChange={this.handleChange}
            sendClick={this.sendClick}
            handleKeyPress={this.handleKeyPress} value={this.state.text}
          />
        </div>
        <div id="users">
          <UserProfile currentChat = {this.state.currentChat} username = {parseUsername(document.cookie)} />
          <UserList friends = {this.state.friends}/>
        </div>
      </div>
    );
  }
}

const parseUsername = (cookieString) => {
  const indexOfUser = cookieString.indexOf('user=');
  return cookieString.slice(indexOfUser + 5).split(';')[0];
}

export default App;

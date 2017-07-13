//import things here
import React, { Component } from 'react';
import Chatbox from './Chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';
import Userlist from './user-list.jsx';
import UserProfile from './user-profile.jsx';

const socket = new WebSocket('ws://192.168.0.98:3000/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.sendClick = this.sendClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // before executing the set state below, componentDidMount needs to reach out to
    // server via our websocket and pull down the list of messages between user and user[0].
    return socket.onopen = (event) => this.updateMessages();
  }

  updateMessages() {
    const currentChat = this.state.friendsList[0];

    socket.onmessage = (event) => {
      let messages = JSON.parse(event.data);
      if (Array.isArray(messages)) messages.reverse();
      const oldMessages = this.state.messages.slice();
      messages = oldMessages.concat(messages);
      this.setState({ currentChat, messages });
    }
  }

  getInitialState() {
    //return data from socket.onconnect here, with the return statement below inside the callback for that. 
    //this will hold off on populating ANYTHING until that data comes through.
    //connect ajax to this?
    return {
      messages: [],
      friendsList: [
        { username: 'JanelleCS', name: 'Janelle', photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAd8AAAAJGMxYmMyNTQzLTQ5OTgtNGVlNC05OGMzLWI0OTk5YzZlNGQ0MA.jpg' },
        { username: 'JeffreyCS', name: 'Heffe', photo: 'https://scontent.xx.fbcdn.net/v/t1.0-9/11219607_690638340976_327480042333658050_n.jpg?oh=c054527c60804bfd5c4c4fb1968953bd&oe=59C73688' }
      ],
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
    let aMessage = {
      src: this.state.me.username,
      dst: this.state.currentChat.username,
      content: this.state.text,
    };

    socket.send(JSON.stringify(aMessage));
    this.setState({ text: '' });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') this.sendClick(event);
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
    const list = this.state.friendsList.map((friend, i) => (
      <Userlist key={i} userClick={() => this.userClick(i)} user={i}
        username={friend.username} name={friend.name} photo={friend.photo}
      />
    ));

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
          <UserProfile currentChat={this.state.currentChat} username={parseUsername(document.cookie)} />
          <h3>Friends</h3>
          <div className='user-list'>
            <ul>
              {list}
            </ul>
          </div>
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

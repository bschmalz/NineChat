const http = require('http');
const WebSocket = require('ws');
const chatCtrl = require('./controller/chatCtrl')

module.exports = function(app) {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server: server, clientTracking: true });
  const connectList = {};

  const sendToAll = data => {
    Object.keys(connectList).forEach(id => {
      connectList[id].ws.send(data);
    });
  }

  wss.on('connection', (ws, req) => {
    let id = Object.keys(connectList).length;
    let username = req.headers.username ? req.headers.username : "Garret";
    connectList[id] = {id: id, ws: ws, username: username};
  
    chatCtrl.getLastTen(username, (err, messages)=>{
      ws.send(JSON.stringify(messages))
    });

    ws.on('message', (data) => {
      chatCtrl.addMsg(data)
        .then(savedMsg => {
          sendToAll(JSON.stringify(savedMsg));
        })
        .catch(err => console.log(err));
    });

    ws.on('close', (event) => {
      console.log('check it event', event, 'check it id', connectList[id]);
      delete connectList[id];
    });
  });
 return server; 
}
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
    let name; 
    ws.on('message', (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.dst === 'ADDUSER') {
         name = parsedData.src; 
         connectList[name] = {id: name, ws: ws};
         chatCtrl.getLastTen(null, (err, messages) => {
           ws.send(JSON.stringify(messages))
         });
         const ids = Object.keys(connectList); 
         sendToAll(JSON.stringify({src: '__USERLIST__', message: ids})); 
      } else {
      chatCtrl.addMsg(data)
        .then(savedMsg => {
          console.log('saved', savedMsg);
          sendToAll(JSON.stringify(savedMsg));
        })
        .catch(err => console.log(err));
      }

    });

    ws.on('close', (event) => {
      console.log('check it event', name);
      delete connectList[name]; 
      const ids = Object.keys(connectList); 
      sendToAll(JSON.stringify({src: '__USERLIST__', message: ids})); 
    });
  });
 return server; 
}
# NineChat
NineChat is a websocket/NodeJS based real time chat application. It has basic functionality such as a list of the currently signed in users as well as the timestamp of the most recent post. More features will be added soon. 

# Setup 
Please follow these steps if you would like to deploy NineChat in your environment. 


1. 'npm install'
2. On line 9 of App.js, update this line to reflect the IP address of your machine (const socket = new WebSocket('ws://192.165.90.107:3000/')
3. 'npm run webpack'
4. 'npm start' 
5. Open localhost:3000 in your browser. 

If you want other machines to connect with you, they want to use the url of the machine running the server for their address. 

const mongoose = require('mongoose');

mongoose.connect('mongodb://awesomeprogrammer:iloveclimbing@ds034677.mlab.com:34677/ninechatplusplus');
mongoose.connection.once('open', () => {
  console.log('1');
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

module.exports = { mongoose };
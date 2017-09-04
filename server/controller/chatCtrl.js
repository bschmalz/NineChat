const Message = require('../model/message');
const User = require('../model/user');
const { mongoose } = require('./../db/mongoose');

const chatCtrl = {
  addMsg(data, callback) {
    return new Promise((resolve, reject) => {
      const message = new Message(JSON.parse(data));
      message.save((err, savedMessage) => {
        if (err) reject(err);
        resolve(savedMessage);
      });
    });
  },

  getLastTen(userid, callback){
    Message.
      find({}).
      sort({timestamp: -1}).
      limit(100).
      exec((err, result)=>{
        console.log('err', err)
        return callback(err, result)
    })
  },

  get(req, res, next){
    Message.find({}, (err, messages) => {
      if (err) res.status(418).send(err);
      res.json(messages);
    });
  }
};

module.exports = chatCtrl

const mongoose = require('mongoose');


let messagesSchema = mongoose.Schema({
    src: {type: String, required: true},
    dst: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: { type: Date, default: Date.now }
});

let messages = mongoose.model('Messages', messagesSchema)
module.exports = messages 
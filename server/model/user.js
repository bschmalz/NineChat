const { mongoose } = require('./../db/mongoose');

let usersSchema = mongoose.Schema({
    // user_id: String,
    username: {
      type: String,
      unique : true,
      required : true,
      dropDups: true
    },
    convs: [{conv_id: Number}],
    fList: [{username: String}]
});

let users = mongoose.model('Users', usersSchema)
module.exports = users
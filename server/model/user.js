const { mongoose } = require('./../db/mongoose');
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    // user_id: String,
    username: {
      type: String,
      unique : true,
      required : true,
      dropDups: true
    },
    password: {
      type: String,
      required : true
    }
});

userSchema.pre('save', function(next) {
    let hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.comparePassword = function(passw) {
   return bcrypt.compareSync(passw, this.password);
};

let user = mongoose.model('User', userSchema)
module.exports = user;
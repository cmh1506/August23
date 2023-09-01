const mongoose = require('mongoose');

const { Schema } = mongoose;

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema(
  {
    name: {type: String},
    email: {type: String, required:true, unique:true},
    username : {type: String, unique: true, required:true}
  }
)
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema)
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true}
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique!!!' });

module.exports = mongoose.model('User', userSchema);

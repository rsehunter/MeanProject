const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
    url: {type: String, require: true, default: "default title"},
    caption: {type: String, require: true, default: "default title"},
    location: {type: String, require: true, default: "default content"},
});

module.exports = mongoose.model('Photo', photoSchema);

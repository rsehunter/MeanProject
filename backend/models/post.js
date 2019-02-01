const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: { type: String, require: true, default: "default title" },
    content: { type: String, require: true, default: "default content" }
});

module.exports = mongoose.model('Post', postSchema);

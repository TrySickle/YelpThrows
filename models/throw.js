var mongoose = require("mongoose");

var throwSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Throw", throwSchema);
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: [String],
    // userId: Number,
    // collegeName: String,
    // mobno: Number
    
});
model = mongoose.model("Test", UserSchema);
module.exports = model;
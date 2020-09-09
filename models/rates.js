var mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({},
    {strict:false }
  );
model = mongoose.model("rates",UserSchema);
module.exports = model;
const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String
  },
  doneAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Todo", schema);

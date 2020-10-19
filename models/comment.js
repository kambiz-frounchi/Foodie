const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  name: {
    type: String
  }
});

const Comment = model("Comment", commentSchema);

module.exports = {commentSchema, Comment};
const moment = require('moment')
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentSchema = new schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    question: { 
      type: schema.Types.ObjectId,
      ref: "question",
    },
    content: {
      type: String,
    }, 
    created_time: {
      type: String, 
    },
    created_date: {
      type: String,
    },
  },
  { timestamps: true }
);


const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;

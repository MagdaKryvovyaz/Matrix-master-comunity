const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: [true, "Please enter your question"],
      maxLength: [250, "Your description must be no longer than 250 characters "]
    },
    description: {
      type: String,
      maxLength: [1000, "Your description must be no longer than 1000 characters "]
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user' 
    },
    created_time: {
      type: String,
    },
    created_date: {
      type: String,
    },
    comments: { 
      type: [mongoose.Schema.Types.ObjectId], 
      ref: 'comment' 
    }
  },{timestamps: true }
);

const Question = mongoose.model("question", questionSchema);

module.exports = Question;

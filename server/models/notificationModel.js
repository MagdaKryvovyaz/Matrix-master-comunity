const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "comment"],
    required: true,
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;

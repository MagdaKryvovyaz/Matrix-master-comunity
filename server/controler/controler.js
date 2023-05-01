const Question = require("../models/questionModel");
const userModel = require("../models/userModel");
const Comment = require("../models/commetModel");
const Notification = require("../models/notificationModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const app = require("../server");
const http = require("http");
const { log } = require("console");
const server = http.createServer(app);
const io = require("socket.io")(server);

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//  login controllers

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    //create token
    const token = createToken(user._id);
    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup controllers

const signupUser = async function (req, res) {
  const { email, password, user } = req.body;
  try {
    const newUser = await userModel.signup(email, password, user);
    //create token
    const token = createToken(newUser._id);
    res.status(200).json({ email, token, id: newUser._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleError = (err) => {
  let errors = { title: "", description: "" };
  //validation error
  if (err.message.includes("question validation failed: title")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//  quesions controllers
const post_question = (req, res) => {
  let time = moment(Date.now()).format("hh:mma");
  let date = moment(Date.now()).format("D MMMM YYYY");
  const question = new Question({
    ...{ user: req.params.id },
    ...req.body,
    ...{ created_time: time, created_date: date },
  });

  question
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      const errors = handleError(err);
      let errTitle = errors.title;
      let errDescription = errors.description;
      res.render("addQuestion", {
        errTitle,
        errDescription,
        user: req.params.id,
      });
    });
};

const get_question = (req, res) => {
  Question.find()
    .populate("user")
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const get_question_info = (req, res) => {
  Question.findById(req.params.id)
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .populate("likes")
    .then((result) => {
      if (!result) {
        throw new Error("not found");
      }
      res.json(result);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
};

const delete_question_by_id = (req, res) => {
  Question.findById(req.params.id)
    .populate("user")
    .then((result) => {
      if (result.user._id.toString() === req.params.userid) {
        Question.findByIdAndDelete(req.params.id).then((result) => {
          Notification.deleteMany({ question: req.params.id }).then(
            (deletedNotification) => {
              console.log("Deleted Notification: ", deletedNotification);
              res.json(result);
            }
          );
        });
      }
    });
};

const post_edit_question = (req, res) => {
  Question.findById(req.params.id)
    .populate("user")
    .then((result) => {
      if (result.user._id.toString() === req.params.userid) {
        Question.findByIdAndUpdate(req.params.id, req.body).then((result) => {
          res.json(result);
        });
      }
    });
};

//  Comments controllers

const addComment = (req, res, io) => {
  let time = moment(Date.now()).format("hh:mma");
  let date = moment(Date.now()).format("D MMMM YYYY");

  const commentObj = {
    ...{ user: req.params.userid },
    ...{ question: req.params.questionid },
    ...req.body,
    ...{ created_time: time, created_date: date },
  };

  let newComment = new Comment(commentObj);
  newComment
    .save()
    .then((result) => {
      Question.findByIdAndUpdate(req.params.questionid, {
        $push: { comments: result._id },
      })
        .populate("comments")
        .then((result) => {
          // Create a new notification for the user who owns the post
          const newNotification = new Notification({
            user: result.user,
            question: result._id,
            type: "comment",
            fromUser: req.body.user,
          });
          newNotification.save();

          // Emit a socket event with the comment data
          io.emit("newComment", {
            commentId: result._id,
            userId: req.body.user,
            questionId: result.user,
          });

          res.redirect(`/question/${req.params.questionid}`);
        });
    })
    .catch((err) => console.log(err));
};

const delComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ success: false, msg: "Comment not found" });
    }

    if (comment.user.toString() !== req.params.userid) {
      return res
        .status(401)
        .json({ success: false, msg: "User not authorized" });
    }

    res
      .status(200)
      .json({ success: true, msg: "Comment deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { delComment };

// profile controllers

const post_profile_edit = (req, res) => {
  userModel
    .findByIdAndUpdate(req.params.id, {
      user: req.body.user,
      description: req.body.description,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const post_profile_photo = (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please choose an image");
    error.httpStatusCode = 400;
    return next(error);
  }
  userModel
    .findByIdAndUpdate(req.params.id, { imageUrl: file.filename })
    .then((result) => {
      // res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const get_profile_by_id = (req, res) => {
  const data = { user: {}, questions: [] };
  userModel
    .findById(req.params.id)
    .then((result) => {
      data.user = result;
    })
    .then(() => {
      Question.find()
        .populate("user")
        .then((result) => {
          result = result.filter(
            (question) => question.user._id == req.params.id
          );
          data.questions = result;
        })
        .then(() => {
          res.json(data);
        });
    });
};

const get_all_users = (req, res) => {
  userModel
    .find()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

// likes
const postLike = async (req, res) => {
  try {
    // find the question to update the like
    const question = await Question.findById(req.params.questionId);
    if (!question.likes.includes(req.params.userId)) {
      await question.updateOne({ $push: { likes: req.params.userId } });
      // create a new notification record for the user who owns the question
      await Notification.create({
        user: question.user,
        question: question._id,
        type: "like",
        fromUser: req.params.userId,
      });
      res.redirect(`/question/${req.params.questionId}`);
    } else {
      await question.updateOne({ $pull: { likes: req.params.userId } });
      res.redirect(`/question/${req.params.questionId}`);
    }
  } catch (err) {
    console.log(err);
  }
};
// GET notifications for a user
const getNotifications = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .populate("questions");
    const notifications = await Notification.find({ user: user._id })
      .populate("fromUser", "user")
      .populate("question", "title")
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateNotificationsSeen = async (req, res) => {
  const userId = req.params.userId;
  try {
    const notifications = await Notification.updateMany(
      ({ user: userId, seen: false }, { seen: true })
    );
    const updatedNotifications = await Notification.find({
      user: userId,
      seen: true,
    });
    res.status(200).json(updatedNotifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  post_question,
  get_question,
  get_question_info,
  delete_question_by_id,
  post_edit_question,
  addComment,
  delComment,
  post_profile_edit,
  get_profile_by_id,
  post_profile_photo,
  postLike,
  getNotifications,
  updateNotificationsSeen,
  get_all_users,
};

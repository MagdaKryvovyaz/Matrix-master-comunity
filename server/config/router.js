const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const upload = require("../middleware/multer");
const app = require('../server');
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const {
  signupUser,
  loginUser,
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
  get_all_users
} = require("../controler/controler");

const requireAuth = require("../middleware/requireAuth");

router.use(cookieParser());

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

// Questions routes
router.get("/", get_question);
router.post("/question/:id", post_question);
router.delete("/delete-question/:id/:userid", delete_question_by_id);
router.post("/question/edit/:id/:userid", post_edit_question);

// question and users who liked it
router.get("/question/:id", get_question_info);

// comments routes
router.post("/question/comment/:userid/:questionid", (req, res) => {
  addComment(req, res, io); 
});


router.delete('/question/delete/comment/:userid/:id/:questionid', delComment );

// get all users
router.get("/users", get_all_users);

// profile routes
router.get("/profile/:id", get_profile_by_id);
router.post("/profile-page-edit/:id", post_profile_edit);

// uploading image
router.post(
  "/profile/edit/photo/:id",
  upload.upload.single("image"),
  post_profile_photo
);

//like
router.post("/question/like/:questionId/:userId", postLike);


//notification 
router.get("/notifications/:userId", getNotifications)
router.put('/notifications/:userId/seen', updateNotificationsSeen);
// 404 page
router.all("*", (req, res) => {
  res.status(404).render("404");
});

module.exports = router;

const express = require('express');
var cors = require('cors');
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  updatePost,
  deletePost,
  photo,
  singlePost,
  like,
  unlike,
  tags,
  postCount,
  pathypost
} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator');
// const postController = require("../controllers/post");
// router.get("/", postController.getPosts);
// router.post("/post", postController.createPost);
const router = express.Router();

var corsOptions = {
  origin: ['https://gifted-gates-e3aa20.netlify.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.get('/posts', getPosts);

// like unlike
router.put('/post/like', like);
router.put('/post/unlike', unlike);
//tags
router.post('/post/tags', tags);
router.post('/post/pathyposts',pathypost);

router.get('/post/count', postCount);
router.post(
  // use requireSignin as middleware
  '/post/new/:userId', // in order to post something we need userId

  createPost,
  createPostValidator // this validator should be at last bz then it shows error in the starting only of title & body
);
router.get('/posts/by/:userId', requireSignin, postsByUser);

// no mandatory to add requireSignin as userId is there in params
router.get('/post/:postId', cors(corsOptions), singlePost);
router.put('/post/:postId', requireSignin, updatePost);
router.delete('/post/:postId', requireSignin, deletePost);

// photo
router.get('/post/photo/:postId', photo);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

module.exports = router;

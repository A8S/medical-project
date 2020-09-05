const Post = require('../models/Post');
const formidable = require('formidable'); // for handling file uploads
const fs = require('fs'); // file system
const _ = require('lodash');

// exports.getPost = (req, res) => {
//     res.json({
//         posts: [{ title: "First Post"}, {title: "Second Post"}]
//     });
// };

// exports.createPost = (req, res) => {
//     const post = new Post(req.body);
//     // console.log("Creating post:", req.body);         // without body parser this show undefined
//     // post.save((err, result) => {
//     //     if (err) {
//     //         return res.status(400).json({           //for HTTP status request 400, 404, 200 etc
//     //             error: err
//     //         });
//     //     }
//     //     res.status(200).json({
//     //         post: result
//     //     });
//     // });
//     post.save().then(result => {
//         res.json({
//             post: result
//         });
//     });
// };

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate('postedBy', '_id name role')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err,
        });
      }
      req.post = post;
      next();
    });
};

// exports.getPosts = (req, res) => {
//   const posts = Post.find()
//     .populate("postedBy", "_id name") // want properties (id and name) of posted
//     .select("_id title description treatmentTaken body created")
//     .sort({ created: -1 }) //by -1 the recent created would come first
//     .then(posts => {
//       //to check: { "title": "First Post","body": "this is body"}
//       res.json(posts);
//     })
//     .catch(err => console.log(err));
// };

// with pagination
exports.getPosts = async (req, res) => {
  // get current page from req.query or use default value of 1
  const currentPage = req.query.page || 1;
  // return 3 posts per page
  const perPage = 7;
  let totalItems;

  const posts = await Post.find()
    // countDocuments() gives you total count of posts
    // .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .populate('comments', 'text created')
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .sort({ date: -1 })
        .limit(perPage)
        .select('_id title body likes created tags');
    })
    .then((posts) => {
      console.log('ccddddd', posts.length);
      res.status(200).json(posts);
    })
    .catch((err) => console.log(err));
};

exports.countPosts = async (req, res) => {
  // get current page from req.query or use default value of 1
  const currentPage = req.query.page || 1;
  // return 3 posts per page
  const perPage = 7;
  let totalItems;

  const posts = await Post.find()
    // countDocuments() gives you total count of posts
    // .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .populate('comments', 'text created')
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .sort({ date: -1 })
        .limit(perPage)
        .select('_id title body likes created tags');
    })
    .then((posts) => {
      console.log('ccddddd', posts.length);
      res.status(200).json(posts);
    })
    .catch((err) => console.log(err));
};

exports.postCount = (req, res) => {
  console.log('this is ');
  Post.find({}, (err, result) => {
    console.log('fjnskdfn', result);
    if (err) {
      return res.send(err);
    }

    console.log('fjnskdfn', result.length);
    let Obj = { count: result.length };
    res.status(200).json(Obj);
  });
};
// to test this method we need to enter x-www-form-urlencoded option in postman
exports.createPost = (req, res, next) => {
  // console.log('divyanshu');
  // this function work only when form data is there
  let form = new formidable.IncomingForm(); // give incoming form fields
  form.keepExtensions = true; // keep the extensions like jpeg, png, pdf etc
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    fields.tags = fields.tags.split(',');

    console.log('fsdfdsfd', fields);
    let post = new Post(fields); // so post will be there with all the fields coming

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    // console.log("PROFILE",req.profile);

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path); // read for the path
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
      console.log('new post ', result);
    });
  });
};

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    // .populate("postedBy", "_id name")
    .populate('postedBy', '_id name role')
    .select('title body likes')
    .sort('_created')
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(posts);
    });
};

// make sure id and postbyId matches
// exports.isPoster = (req, res, next) => {
//   let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

//   if (!isPoster) {
//     return res.status(403).json({
//       error: "User is not authorized"
//     });
//   }
//   next();
// };

exports.isPoster = (req, res, next) => {
  const sameUser =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;
  const adminUser = req.post && req.auth && req.post.auth.role === 'admin';
  let isPoster = sameUser || adminUser;

  console.log('req.post ', req.post, ' req.auth ', req.auth);
  console.log('SAMEUSER: ', sameUser, ' ADMINUSER: ', adminUser);

  if (!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized',
    });
  }
  next();
};

// exports.updatePost = (req, res, next) => {
//     let post = req.post;
//     post = _.extend(post, req.body);
//     post.updated = Date.now();
//     post.save(err => {
//         if (err) {
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         res.json(post);
//     });
// };

exports.updatePost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Photo could not be uploaded',
      });
    }
    // save post
    let post = req.post;
    post = _.extend(post, fields);
    post.updated = Date.now();

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(posts);
    });
  });
};

exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Post deleted successfully',
    });
  });
};

exports.photo = (req, res, next) => {
  if (req.post.photo.data) {
    res.set(('Content-Type', req.post.photo.contentType));
    // console.log("PROFILE",req.post);
    return res.send(req.post.photo.data);
  }
  next();
};

exports.singlePost = (req, res) => {
  return res.json(req.post);
};

exports.like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
};

exports.unlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
};

exports.tags = async (req, res) => {
  console.log('this is ', req.body.tags);
  const posts = await Post.find()
    .then((count) => {
      return Post.find({ tags: { $all: req.body.tags } })
        .populate('comments', 'text created')
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .sort({ date: -1 })

        .select('_id title body likes created tags');
    })
    .then((posts) => {
      //  const filtered = posts.filter(post => post.tags)
      console.log('cc', posts);
      res.status(200).json(posts);
    })
    .catch((err) => console.log(err));
};

exports.pathypost = async (req, res) => {
  console.log('this is ', req.body.treatmentTaken);
  const posts = await Post.find()
    .then((count) => {
      return Post.find(({ treatmentTaken: { $all: req.body.treatmentTaken } } )&&({tags:{$all: req.body.tags}}))
        .populate('comments', 'text created')
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .sort({ date: -1 })

        .select('_id title body likes created tags treatmentTaken');
    })
    .then((posts) => {
      //  const filtered = posts.filter(post => post.tags)
      console.log('cc', posts);
      res.status(200).json(posts);
    })
    .catch((err) => console.log(err));
};


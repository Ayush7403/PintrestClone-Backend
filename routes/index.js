const express = require('express');
const router = express.Router();
const passport = require("passport");
const localStrategy = require('passport-local');
const upload = require('./multer');
const userModel = require("./users");
const postModel = require("./post");

// Passport local strategy
passport.use(new localStrategy(userModel.authenticate()));

// ------------------ Routes ------------------

// Login page
router.get('/', (req, res) => {
  const message = req.flash('error')[0];
  res.render('index', {
    title: 'Login Page',
    message: message || null
  });
});


// Registration page
router.get('/register', (req, res) => {
  res.render('register', { nav: false, title: 'Register' });
});

// Profile page
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ username: req.session.passport.user })
      .populate("posts");

    res.render('profile', {
      user,
      posts: user.posts,
      nav: true,
      title: 'Your Profile'
    });
  } catch (err) {
    res.status(500).send("Error loading profile.");
  }
});

// Show all posts from the user
router.get('/show/posts', isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");

  res.render('show', {
    user,
    nav: true,
    posts: user.posts,
    title: 'Your Posts'
  });
});

// Feed page - all posts
router.get('/feed', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");

  res.render("feed", {
    user,
    posts,
    nav: true,
    title: 'Feed'
  });
});

// Add post form
router.get('/add', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
  res.render('add', { user, nav: true, title: 'Add New Post' });
});

// Create post handler
router.post('/createpost', isLoggedIn, upload.single("postimage"), async function(req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    user: user._id,
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

// Profile image upload
router.post('/fileupload', isLoggedIn, upload.single("image"), async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.profileImage = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

// Handle registration
router.post('/register', async (req, res) => {
  try {
    const userData = new userModel({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email
    });

    await userModel.register(userData, req.body.password);
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  } catch (err) {
    res.send("Registration failed: " + err.message);
  }
});

// Handle login
router.post('/login', passport.authenticate("local", {
  failureRedirect: "/",
  failureFlash: true,
  successRedirect: "/profile"
}));

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
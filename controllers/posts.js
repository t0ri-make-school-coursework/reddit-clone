const Post = require('../models/post');

module.exports = app => {
  app.get("/", (req, res) => {
    var currentUser = req.user;
  
    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get('/posts/new', (req, res) => {
    var currentUser = req.user;

    res.render('posts-new')
  })

  // CREATE
  app.post("/posts/new", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);

      post.save(function(err, post) {
        return res.redirect(`/`);
      });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  app.get('/posts/:id', function(req, res) {
    var currentUser = req.user;
    // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments').then((post) => {
      res.render('posts-show', { post })
    }).catch((err) => {
      console.log(err.message)
    })
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    var currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
      res.render("posts-index", { posts });
    })
    .catch(err => {
      console.log(err);
    });
  });
};


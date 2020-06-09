const express = require("express");
const posts = require("../data/db");

const router = express.Router();

router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/api/posts/:id/comments", (req, res) => {});

router.get("/api/posts", (req, res) => {
  posts
    .find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

router.get("/api/posts/:id", (req, res) => {});

router.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }

      return posts.findPostComments(req.params.id);
    })
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

router.delete("/api/posts/:id", (req, res) => {});

router.put("/api/posts/:id", (req, res) => {});

module.exports = router;

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

router.get("/api/posts", (req, res) => {});

router.get("/api/posts/:id", (req, res) => {});

router.get("/api/posts/:id/comments", (req, res) => {});

router.delete("/api/posts/:id", (req, res) => {});

router.put("/api/posts/:id", (req, res) => {});

module.exports = router;

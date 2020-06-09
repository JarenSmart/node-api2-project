const express = require("express");
const postRouter = require("./posts/posts-router");

const server = express();
const port = 6666;

server.use(express.json());
server.use(postRouter);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

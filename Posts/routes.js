import * as dao from "./dao.js";

export default function PostRoutes(app) {
  const findPostsForCircle = async (req, res) => {
    const posts = await dao.findPostsForCircle(req.params.circleId);
    res.json(posts);
  };
  app.get("/api/circles/:circleId/posts", findPostsForCircle);

  const createPost = async (req, res) => {
    const newPost = {
      ...req.body,
      community: req.params.circleId,
    };
    // Need _id?
    const post = await dao.createPost(newPost);
    res.json(post);
  };
  app.post("/api/circles/:circleId/posts", createPost);

  const deletePost = async (req, res) => {
    const status = await dao.deletePost(req.params.postId);
    res.json(status);
  };
  app.delete("/api/posts/:postId", deletePost);

  const updatePost = async (req, res) => {
    const status = await dao.updatePost(req.params.postId, req.body);
    res.json(status);
  };
  app.put("/api/posts/:postId", updatePost);

  const findPostsForProfile = async (req, res) => {
    const posts = await dao.findPostsForUser(req.params.profileId);
    res.json(posts);
  };
  app.get("/api/profiles/:profileId/posts", findPostsForProfile);

  const findLikedPostsForProfile = async (req, res) => {
    const posts = await dao.findLikedPostsForUser(req.params.profileId);
    res.json(posts);
  };
  app.get("/api/profiles/:profileId/likes", findLikedPostsForProfile);
}
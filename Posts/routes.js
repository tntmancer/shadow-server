import * as dao from "./dao.js";

export default function PostRoutes(app) {
  const findPostsForCircle = async (req, res) => {
    const posts = await dao.findPostsForCircle(req.params.circleId);
    res.json(posts);
  };
  app.get("/api/circles/:circleId/posts", findPostsForCircle);

  const findAllPosts = async (req, res) => {
    const {partialName} = req.query;
    if (partialName) {
        const posts = await dao.findPostsByPartialName(partialName);
        res.json(posts);
        return;
    }

    const posts = await dao.findAllPosts();
    res.json(posts);
  };
  app.get("/api/posts", findAllPosts);

  const findPublicPosts = async (req, res) => {
    const posts = await dao.findPublicPosts();
    res.json(posts);
  };
  app.get("/api/posts/public", findPublicPosts);

  const createPost = async (req, res) => {
    const newPost = {
      ...req.body,
      circle: req.params.circleId,
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
    const posts = await dao.findPostsForProfile(req.params.profileId);
    res.json(posts);
  };
  app.get("/api/profiles/:profileId/posts", findPostsForProfile);

  const findLikedPostsForProfile = async (req, res) => {
    const posts = await dao.findLikedPostsForProfile(req.params.profileId);
    res.json(posts);
  };
  app.get("/api/profiles/:profileId/likes", findLikedPostsForProfile);

  const findPostForId = async (req, res) => {
    const post = await dao.findPostForId(req.params.postId);
    res.json(post);
  };
  app.get("/api/posts/:postId", findPostForId);

  const findAuthorForPost = async (req, res) => {
    const author = await dao.findAuthorForPost(req.params.postId);
    res.json(author);
  };
  app.get("/api/posts/:postId/author", findAuthorForPost);

  const likePost = async (req, res) => {
    const status = await dao.likePost(req.params.postId, req.params.profileId);
    res.json(status);
  };
  app.post("/api/profiles/:profileId/likes/:postId", likePost);

  const unlikePost = async (req, res) => {
    const status = await dao.unlikePost(req.params.postId, req.params.profileId);
    res.json(status);
  };
  app.delete("/api/profiles/:profileId/likes/:postId", unlikePost);

  const addPostToProfile = async (req, res) => {
    const status = await dao.addPostToProfile(req.params.postId, req.params.profileId);
    res.json(status);
  }
  app.post("/api/profiles/:profileId/posts/:postId", addPostToProfile);
}
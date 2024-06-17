import * as dao from "./dao.js";

export default function ReplyRoutes(app) {
    const findRepliesForPost = async (req, res) => {
      const replies = await dao.findRepliesForPost(req.params.postId);
      res.json(replies);
    };
    app.get("/api/posts/:postId/replies", findRepliesForPost);

    const findRepliesForUser = async (req, res) => {
        const replies = await dao.findRepliesForUser(req.params.userId);
        res.json(replies);
    };
    app.get("/api/users/:userId/replies", findRepliesForUser);
  
    // const createReply = async (req, res) => {
    //   const newReply = {
    //     ...req.body,
    //     post: req.params.postId,
    //   };
    //   // Need _id?
    //   const reply = await dao.createReply(newReply);
    //   res.json(reply);
    // };
    // app.post("/api/posts/:postId/replies", createReply);
    
    const createReply = async (req, res) => {
        const reply = await dao.createReply(req.body);
        res.json(reply);
    };
    app.post("/api/replies", createReply);
    // IDK whether to create in posts route or replies route
    // Mongo will auto-generate _id
  
    const deleteReply = async (req, res) => {
      const status = await dao.deleteReply(req.params.replyId);
      res.json(status);
    };
    app.delete("/api/replies/:replyId", deleteReply);
  
    const updateReply = async (req, res) => {
      const status = await dao.updateReply(req.params.replyId, req.body);
      res.json(status);
    };
    app.put("/api/replies/:replyId", updateReply);

    const findReplyForId = async (req, res) => {
        const reply = await dao.findReplyForId(req.params.replyId);
        res.json(reply);
    };
    app.get("/api/replies/:replyId", findReplyForId);
  }

// We very likely need a function to fetch posts by partial description/title
// Actually, we will handle this through filtering in the search bar.
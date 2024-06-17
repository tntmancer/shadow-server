import { model } from "./model.js";
import { model as profileModel } from "../Profiles/model.js";
import e from "express";

export const findRepliesForPost = async (postId) => {
    return model.find({ post: postId });
}
export const findRepliesForUser = async (userId) => {
    profile = await profileModel.findById(userId);
    return model.find({ _id: { $in: profile.profileData.replies } });
}
export const createReply = async (newReply) => {
    delete module._id;
    return model.create(newReply);
}
export const deleteReply = async (replyId) => {
    return model.deleteOne({ _id: replyId});
}
export const updateReply = async (replyId, reply) => {
    return model.updateOne({ _id: replyId }, reply);
}
export const findReplyForId = async (replyId) => {
    return model.findById(replyId);
}
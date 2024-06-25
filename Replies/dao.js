import { model } from "./model.js";
import { model as profileModel } from "../Profiles/model.js";
import { model as postModel } from "../Posts/model.js";
import e from "express";

export const findRepliesForPost = async (postId) => {
    return model.find({ post: postId });
}
export const findRepliesForUser = async (userId) => {
    const repliesFound = await profileModel.findById(userId).select('replies');
    const replies = repliesFound['posts']
    return model.find({ _id: { $in: replies } });
}

export const createReply = async (newReply) => {
    delete newReply._id;
    // console.log(newReply);
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
export const findAuthorForReply = async (replyId) => {
    return profileModel.findOne({ "replies": replyId });
}
export const addReplyToProfile = async (replyId, profileId) => {
    return profileModel.updateOne({ _id: profileId }, { $push: { "replies": replyId } });
}
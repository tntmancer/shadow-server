import {model} from "./model.js";
import { model as profileModel } from "../Profiles/model.js";
import { model as circleModel } from "../Circles/model.js";

export const findPostsForCircle = async (circleId) => {
    return model.find({ circle: circleId });
}
export const findAllPosts = async () => {
    return model.find({});
}
export const findPublicPosts = async () => {
    const publicCircles = await circleModel.find({ public: true }).select('_id');
    const publicCircleIds = publicCircles.map(circle => circle._id);
    return model.find({ circle: { $in: publicCircleIds } });
}
export const createPost = async (newPost) => {
    delete module._id;
    return model.create(newPost);
}
export const deletePost = async (postId) => {
    return model.deleteOne({ _id: postId });
}
export const updatePost = async (postId, post) => {
    return model.updateOne({ _id: postId }, post);
}
// Hopefully this is the correct way to do this
export const findPostsForProfile = async (profileId) => {
    const profile = await profileModel.findById(profileId);
    return model.find({ _id: { $in: profile.profileData.posts } });
}
export const findLikedPostsForProfile = async (profileId) => {
    const profile = await profileModel.findById(profileId);
    return model.find({ _id: { $in: profile.profileData.likes } });
}
export const findPostForId = async (postId) => {
    return model.findById(postId);
}
export const findAuthorForPost = async (postId) => {
    return profileModel.findOne({ "profileData.posts": postId });
}
export const likePost = async (postId, profileId) => {
    return profileModel.updateOne({ _id: profileId }, { $push: { "profileData.likes": postId } });
}
export const unlikePost = async (postId, profileId) => {
    return profileModel.updateOne({ _id: profileId }, { $pull: { "profileData.likes": postId } });
}
export const addPostToProfile = async (postId, profileId) => {
    return profileModel.updateOne({ _id: profileId }, { $push: { "profileData.posts": postId } });
}
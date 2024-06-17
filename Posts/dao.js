import model from "./model.js";
import { model as profileModel } from "../Profiles/model.js";

export const findPostsForCircle = async (circleId) => {
    return model.find({ circle: circleId });
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
import {model} from "./model.js";

export const findAllProfiles = async () => {
    return model.find();
}
export const findProfileById = async (profileId) => {
    return model.findById(profileId);
}
export const findProfilesByRole = async (role) => {
    return model.find({ role: role });
}
export const createProfile = async (profile) => {
    delete profile._id;
    return model.create(profile);
}
export const updateProfile = async (profileId, profile) => {
    return model.updateOne({ _id: profileId }, profile);
}
export const deleteProfile = async (profileId) => {
    return model.deleteOne({ _id: profileId });
}
export const findProfileByUsername = async (username) => {
    return model.findOne({username: username});
}
export const findProfileByCredentials = async (username, password) => {
    return model.findOne({username: username, password : password});
}
// export const findAuthorForPost = async (postId) => {
//     // Find a profile that has a post with the given postId
//     return model.findOne({ "profileData.posts": postId });
// }
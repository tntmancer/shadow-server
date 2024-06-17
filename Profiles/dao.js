import model from "./model.js";

export const findAllProfiles = async () => {
    return model.find();
}
export const findProfileById = async (profileId) => {
    return model.findById(profileId);
}
// ??? maybe querify it?
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
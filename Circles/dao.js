import {model} from "./model.js";
import { model as profileModel } from "../Profiles/model.js";

export const fetchAllCircles = async () => {
    return model.find({});
}
export const fetchAllPublicCircles = async () => {
    return model.find({ public: true });
}
export const findCircleForId = async (circleId) => {
    return model.findById(circleId);
}
export const findCirclesForMember = async (userId) => {
    const circlesFound = await profileModel.findById(userId).select('memberOf');
    const circles = circlesFound['memberOf']
    return model.find({ _id: { $in: circles } });
}
export const findCirclesForModerator = async (moderatorId) => {
    const circlesFound = await profileModel.findById(moderatorId).select('moderatorOf');
    const circles = circlesFound['moderatorOf']
    return model.find({ _id: { $in: circles } });
}
export const findModeratorsForCircle = async (circleId) => {
    return profileModel.find({ "moderatorOf": circleId });
}
export const joinCircle = async (circleId, userId) => {
    // console.log("circle", circleId, "user", userId);
    return profileModel.findByIdAndUpdate(userId, { $addToSet: { "memberOf": circleId } });
}
export const leaveCircle = async (circleId, userId) => {
    console.log("circle", circleId, "user", userId);
    return profileModel.findByIdAndUpdate(userId, { $pull: { "memberOf": circleId } });
}
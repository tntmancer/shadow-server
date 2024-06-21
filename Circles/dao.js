import {model} from "./model.js";
import { model as profileModel } from "../Profiles/model.js";

export const fetchAllCircles = async (circleId) => {
    return model.find({});
}
export const fetchAllPublicCircles = async () => {
    return model.find({ public: true });
}
export const findCircleForId = async (circleId) => {
    return model.findById(circleId);
}
export const findCirclesForMember = async (userId) => {
    const circles = await profileModel.findById(userId).select('memberOf');
    return model.find({ _id: { $in: circles } });
}
export const findCirclesForModerator = async (moderatorId) => {
    const circles = await profileModel.findById(userId).select('moderatorOf');
    return model.find({ _id: { $in: circles } });
}
export const findModeratorsForCircle = async (circleId) => {
    return profileModel.find({ "moderatorOf": circleId });
}
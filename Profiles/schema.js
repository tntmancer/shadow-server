import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    role: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    realName: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    address: { type: String},
    phone: { type: String},
    birthday: { type: String },
    avatar: { type: String },
    bio: { type: String },
    memberSince: { type: String },
    starSign: { type: String },
    MBTI: { type: String },
    following: [String],
    followers: [String],
    posts: [String],
    replies: [String],
    likes: [String],
    memberOf: [String],
    moderatorOf: [String]
  },
  { collection: "profiles" }
);
export default profileSchema;
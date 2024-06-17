import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    role: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    sensitiveData: {
      realName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      birthday: { type: String, required: true }
    },
    profileData: {
      avatar: { type: String, required: true },
      bio: { type: String, required: true },
      memberSince: { type: String, required: true },
      starSign: { type: String, required: true },
      MBTI: { type: String, required: true },
      following: [String],
      followers: [String],
      posts: [String],
      replies: [String],
      likes: [String],
      memberOf: [String],
      moderatorOf: [String]
    }
  },
  { collection: "profiles" }
);
export default profileSchema;
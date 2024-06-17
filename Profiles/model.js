import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("ProfileModel", schema);
export { model };
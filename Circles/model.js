import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("CircleModel", schema);
export default model;
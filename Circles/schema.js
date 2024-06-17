import mongoose from "mongoose";
const circleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    public: { type: Boolean, required: true },
    description: String,
    image: String
  },
  { collection: "circles" }
);
export default circleSchema;
// _id will be auto generated by MongoDB
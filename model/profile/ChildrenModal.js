const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema(
  {
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true }, // Link to Profile
    title: { type: String, required: true },
    forename: { type: String, required: true },
    surname: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Children", childrenSchema);

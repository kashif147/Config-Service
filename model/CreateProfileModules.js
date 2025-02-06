const mongoose = require("mongoose");

const createProfileSchema = new mongoose.Schema(
    {
      regNo: { type: String, required: true },
      title: { type: String, required: false },
      forename: { type: String, required: true },
      surname: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      gender: { type: String, required: true },
      building: { type: String, required: false },
      street: { type: String, required: false },
      area: { type: String, required: false },
      city: { type: String, required: false },
      eircode: { type: String, required: false },
      mobile: { type: String, required: true },
      other: { type: String, required: false },
      email: { type: String, required: true },
    },
    { timestamps: true }
  );
   

const Profile = mongoose.model("Profile", createProfileSchema);
module.exports = Profile;

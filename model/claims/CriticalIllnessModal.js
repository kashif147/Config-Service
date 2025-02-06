const mongoose = require("mongoose");

const CriticalIllnessSchema = new mongoose.Schema(
  {
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true }, // Using profileId instead
    GardaRegNo: { type: String, required: true },
    FullName: { type: String, required: true },
    Garda: { type: String, required: true },
    JoiningDate: { type: Date, required: true },
    ClaimType: { type: String, required: true },
    ClaimDate: { type: Date, required: true },
    ChildName: { type: String },
    MemberCover: { type: String },
    PartnerCover: { type: String },
    ClaimReason: { type: String, required: true },
    Beneficiary: { type: String, required: true },
    PartnerName: { type: String },
  },
  { timestamps: true } // Fixed timestamp property
);

const CriticalIllnessScheme = mongoose.model("CriticalIllnessScheme", CriticalIllnessSchema);
module.exports = CriticalIllnessScheme;

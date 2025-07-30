const mongoose = require("mongoose")

const gardaLifeClaimSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
  AssuredFrom: { type: String, required: true },
  ContactName: { type: String, required: true },
  Deceased: { type: Boolean, required: true },
  ContactPhone: { type: String, required: true },
  ContactAddress: { type: String, required: false },
  FireReference: { type: String, required: false },
  AdvanceAmount: { type: Number, required: false },
  AdvanceDate: { type: Date, required: false },
  AdvanceChequeNumber: { type: String, required: false },
  CoverLevel: { type: String, required: false },
  BalanceAmount: { type: Number, required: false },
  BalanceDate: { type: Date, required: false },
  BalanceChequeNumber: { type: String, required: false },
  Memo: { type: String, required: false }
},
  { timestamps: true }
)
const GardaLifeClaim = mongoose.model('GardaLifeClaim', gardaLifeClaimSchema);
module.exports = GardaLifeClaim;
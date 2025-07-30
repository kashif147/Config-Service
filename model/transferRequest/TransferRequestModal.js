const mongooes = require("mongoose")

const TransferRequestSchema = new mongooes.Schema(
    {
        profileId: { type: mongooes.Schema.Types.ObjectId, ref: "Profile", required: true }, // Using profileId instead
        employeeName: { type: String, required: true },
        currentStation: { type: String, required: true },
        requestedStation: { type: String, required: true },
        resultedStation: { type: String, required: true },
        requestedDate: { type: Date, required: true },
        meetingDate: { type: Date, required: true },
        transferDate: { type: Date, required: true },
        memo: { type: String },
        isPriority: { type: Boolean, default: false },
        transferSuccessful: { type: Boolean, default: false },
      },
      {Timestamp:true}
)

const TransferRequest = mongooes.model('TransferRequest',TransferRequestSchema)
module.exports = TransferRequest
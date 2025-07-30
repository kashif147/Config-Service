const TransferRequest = require('../../model/transferRequest/TransferRequestModal')

// Create a new transfer request
exports.createTransferRequest = async (req, res) => {
  try {
    const transferRequest = new TransferRequest(req.body);
    await transferRequest.save();
    res.status(201).json({ message: "Transfer request created successfully", data: transferRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all transfer requests
exports.getAllTransferRequests = async (req, res) => {
  try {
    const requests = await TransferRequest.find().populate("profileId", "regNo forename surname ").exec(); // Populate profile details
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transfer requests by profileId
exports.getTransferRequestsByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;
    const requests = await TransferRequest.find({ profileId }).populate("profileId", "name email").exec();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single transfer request by ID
exports.getTransferRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await TransferRequest.findById(id).populate("profileId", "name email").exec();
    if (!request) {
      return res.status(404).json({ error: "Transfer request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a transfer request by ID
exports.updateTransferRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequest = await TransferRequest.findByIdAndUpdate(id, req.body, { new: true }).exec();
    if (!updatedRequest) {
      return res.status(404).json({ error: "Transfer request not found" });
    }
    res.status(200).json({ message: "Transfer request updated successfully", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a transfer request by ID
exports.deleteTransferRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await TransferRequest.findByIdAndDelete(id).exec();
    if (!deletedRequest) {
      return res.status(404).json({ error: "Transfer request not found" });
    }
    res.status(200).json({ message: "Transfer request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

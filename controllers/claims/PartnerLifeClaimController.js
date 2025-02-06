const PartnerLifeClaim = require('../../model/claims/PartnerLifeClaimModal');
const mongoose = require("mongoose");


// Create a Partner Life Assurance Claim
exports.createPartnerLifeClaim = async (req, res) => {
  try {
    const { profileId } = req.body;

    if (!profileId) {
      return res.status(400).json({ error: "Profile ID is required" });
    }

    const newClaim = new PartnerLifeClaim(req.body);
    await newClaim.save();
    res.status(201).json({ message: "Partner Life Assurance Claim created successfully", data: newClaim });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Partner Life Assurance Claims for a profile
exports.getPartnerLifeClaimsByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ error: "Invalid Profile ID format" });
    }

    const claims = await PartnerLifeClaim.find({ profileId }).exec();
    res.status(200).json({ data: claims });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Partner Life Assurance Claims (without profileId)
exports.getAllPartnerLifeClaims = async (req, res) => {
  try {
    const claims = await PartnerLifeClaim.find().exec();
    res.status(200).json({ data: claims });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Partner Life Assurance Claim by ID
exports.getPartnerLifeClaimById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Claim ID format" });
    }

    const claim = await PartnerLifeClaim.findById(id).exec();
    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }
    res.status(200).json({ data: claim });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Partner Life Assurance Claim by ID
exports.updatePartnerLifeClaim = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Claim ID format" });
    }

    const updatedClaim = await PartnerLifeClaim.findByIdAndUpdate(id, req.body, { new: true }).exec();

    if (!updatedClaim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.status(200).json({ message: "Partner Life Assurance Claim updated successfully", data: updatedClaim });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Partner Life Assurance Claim by ID
exports.deletePartnerLifeClaim = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Claim ID format" });
    }

    const deletedClaim = await PartnerLifeClaim.findByIdAndDelete(id).exec();
    if (!deletedClaim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.status(200).json({ message: "Partner Life Assurance Claim deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware to check if the user has required role
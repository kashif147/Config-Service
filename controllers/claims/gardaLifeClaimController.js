const GardaLifeClaim = require('../../model/claims/GardaLifeClaimModal');

// Create a Garda Life Assurance Claim
// Example controller methods

// Get all Garda Life Claims
const getAllGardaLifeClaims = async (req, res) => {
  try {
      const claims = await GardaLifeClaim.find();
      res.status(200).json(claims);
  } catch (err) {
      res.status(500).json({ message: "Error fetching claims", error: err.message });
  }
};

// Create a new Garda Life Claim
const createGardaLifeClaim = async (req, res) => {
  try {
      const newClaim = new GardaLifeClaim(req.body);
      await newClaim.save();
      res.status(201).json(newClaim);
  } catch (err) {
      res.status(500).json({ message: "Error creating claim", error: err.message });
  }
};

// Get a specific claim by ID
const getGardaLifeClaimById = async (req, res) => {
  try {
      const claim = await GardaLifeClaim.findById(req.params.id).exec();
      if (!claim) return res.status(404).json({ message: "Claim not found" });
      res.status(200).json(claim);
  } catch (err) {
      res.status(500).json({ message: "Error fetching claim", error: err.message });
  }
};

// Update a specific Garda Life Claim
const updateGardaLifeClaim = async (req, res) => {
  try {
      const updatedClaim = await GardaLifeClaim.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
      if (!updatedClaim) return res.status(404).json({ message: "Claim not found" });
      res.status(200).json(updatedClaim);
  } catch (err) {
      res.status(500).json({ message: "Error updating claim", error: err.message });
  }
};

// Delete a specific Garda Life Claim
const deleteGardaLifeClaim = async (req, res) => {
  try {
      const deletedClaim = await GardaLifeClaim.findByIdAndDelete(req.params.id).exec();
      if (!deletedClaim) return res.status(404).json({ message: "Claim not found" });
      res.status(200).json({ message: "Claim deleted successfully" });
  } catch (err) {
      res.status(500).json({ message: "Error deleting claim", error: err.message });
  }
}; 

// Get all claims for a specific profile
const getGardaLifeClaimsByProfile = async (req, res) => {
  try {
      const claims = await GardaLifeClaim.find({ profileId: req.params.profileId });
      if (!claims) return res.status(404).json({ message: "No claims found for this profile" });
      res.status(200).json(claims);
  } catch (err) {
      res.status(500).json({ message: "Error fetching claims", error: err.message });
  }
};

module.exports = {
  getAllGardaLifeClaims,
  createGardaLifeClaim,
  getGardaLifeClaimById,
  updateGardaLifeClaim,
  deleteGardaLifeClaim,
  getGardaLifeClaimsByProfile
};

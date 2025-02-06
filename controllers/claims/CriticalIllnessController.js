const CriticalIllnessScheme = require('../../model/claims/CriticalIllnessModal');

// Create a new Critical Illness Scheme
exports.createCriticalIllnessScheme = async (req, res) => {
  try {
    const criticalIllnessScheme = new CriticalIllnessScheme(req.body);
    await criticalIllnessScheme.save();
    res.status(201).json({ message: "Critical Illness Scheme created successfully", data: criticalIllnessScheme });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Critical Illness Schemes
exports.getAllCriticalIllnessSchemes = async (req, res) => {
  try {
    const schemes = await CriticalIllnessScheme.find().populate("profileId", "regNo forename surname"); // Populate profile details
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Critical Illness Schemes by profileId
exports.getCriticalIllnessSchemesByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;
    const schemes = await CriticalIllnessScheme.find({ profileId }).populate("profileId", "name email").exec();;
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Critical Illness Scheme by ID
exports.getCriticalIllnessSchemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await CriticalIllnessScheme.findById(id).populate("profileId", "name email").exec();
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    res.status(200).json(scheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Critical Illness Scheme by ID
exports.updateCriticalIllnessScheme = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedScheme = await CriticalIllnessScheme.findByIdAndUpdate(id, req.body, { new: true }).exec();;
    if (!updatedScheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    res.status(200).json({ message: "Critical Illness Scheme updated successfully", data: updatedScheme });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Critical Illness Scheme by ID
exports.deleteCriticalIllnessScheme = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScheme = await CriticalIllnessScheme.findByIdAndDelete(id).exec();;
    if (!deletedScheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    res.status(200).json({ message: "Critical Illness Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

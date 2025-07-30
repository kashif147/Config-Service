const Profile  = require('../model/CreateProfileModules');
const mongoose = require("mongoose"); 

// Create a new profile
const createProfile = async (req, res) => {
    try {
      const { email, mobile, gender, dateOfBirth, surname, forename, regNo } = req.body;
      
      // Manually check if the required fields are present
      if (!email || !mobile || !gender || !dateOfBirth || !surname || !forename || !regNo) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const profile = new Profile(req.body);
      await profile.save();
      res.status(201).json({ message: "Profile created successfully", profile });
    } catch (err) {
      res.status(400).json({ message: "Error creating Profile", error: err.message });
    }
  };
  

// Get all Profile
const getAllProfile = async (req, res) => {
  try {
    const filters = {};
    
    // Loop through request body keys to dynamically build the filter object
    for (const key in req.body) {
      if (req.body[key] !== "" && req.body[key] !== null && req.body[key] !== undefined) {
        if (typeof req.body[key] === "string" && req.body[key].startsWith("!")) {
          // If value starts with "!", exclude that value
          filters[key] = { $ne: req.body[key].substring(1) };
        } else {
          // Otherwise, match the exact value
          filters[key] = req.body[key];
        }
      }
    }

    const profiles = await Profile.find(filters);

    if (!profiles.length) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json(profiles);
  } catch (err) {
    res.status(400).json({ message: "Error fetching profiles", error: err.message });
  }
};



// Get a single user by ID
const getUserByProfile = async (req, res) => {
  try {
      const { id } = req.params;

      // Validate ID format
      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "Invalid ID format" });
      }

      const profile = await Profile.findById(id).exec();

      if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
      }

      res.json(profile);
  } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update user details
const updateProfile = async (req, res) => {
    try {
        const user = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
        res.status(400).json({ message: "Error updating user", error: err.message });
    }
};

// Delete a user
const deleteProfile = async (req, res) => {
  try {
      const deletedProfile = await Profile.findOneAndDelete({ _id: req.params.id }).exec();
      if (!deletedProfile) {
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};



module.exports = {
    createProfile,
    getAllProfile,
    getUserByProfile,
    updateProfile,
    deleteProfile,
};

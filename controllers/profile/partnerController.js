const Partner = require("../../model/profile/partnerModal");
const Profile = require('../../model/CreateProfileModules')
// ✅ Get all partners
const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get a specific partner by ID
const getPartnerById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get all partners of a specific profile
const getPartnersByProfile = async (req, res) => {
    try {
        const { profileId } = req.params;

        // Check if Profile exists
        const profileExists = await Profile.findById(profileId);
        if (!profileExists) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Find partners associated with the profile
        const partners = await Partner.find({ profileId });
        
        if (!partners.length) {
            return res.status(404).json({ message: "No partners found for this profile" });
        }

        res.status(200).json(partners);
    } catch (error) {
        console.error("Error fetching partners:", error);
        res.status(500).json({ message: "Server error fetching partners", error });
    }
};


// ✅ Create a new partner (Fixed parameter names)
const createPartner = async (req, res) => {
    try {
        const { profileId, title, forename, surname, maidenName, dateOfBirth, dateMarriage, deceased, dateOfDeath } = req.body;

        // Required fields validation
        if (!profileId || !forename || !surname || !title || !dateOfBirth) {
            return res.status(400).json({ message: "profileId, title, forename, surname, and dateOfBirth are required" });
        }

        // Check deceased condition
        if (deceased && !dateOfDeath) {
            return res.status(400).json({ message: "dateOfDeath is required if the partner is deceased" });
        }

        const newPartner = new Partner({
            profileId,
            title,
            forename,
            surname,
            maidenName,
            dateOfBirth,
            dateMarriage,
            deceased,
            dateOfDeath
        });

        await newPartner.save();
        res.status(201).json({ message: "Partner created successfully", partner: newPartner });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Update an existing partner (Fixed `dateOfDeath` field)
const updatePartner = async (req, res) => {
    try {
        const { deceased, dateOfDeath } = req.body;

        if (deceased && !dateOfDeath) {
            return res.status(400).json({ message: "dateOfDeath is required if the partner is deceased" });
        }

        const updatedPartner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        res.status(200).json({ message: "Partner updated successfully", partner: updatedPartner });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Delete a partner
const deletePartner = async (req, res) => {
    try {
        const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
        if (!deletedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }
        res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getAllPartners,
    getPartnerById,
    getPartnersByProfile,
    createPartner,
    updatePartner,
    deletePartner
};

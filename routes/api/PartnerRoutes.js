const express = require("express");
const router = express.Router();
const partnerController = require("../../controllers/profile/partnerController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// ✅ Get all partners & Create a new partner
router.route("/")
    .get(partnerController.getAllPartners)  // Get all partners
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), partnerController.createPartner);  // Create a new partner

// ✅ Get, Update, Delete a specific partner by ID
router.route("/:id")
    .get(partnerController.getPartnerById)  // Get a specific partner by ID
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), partnerController.updatePartner)  // Update a partner by ID
    .delete(verifyRoles(ROLES_LIST.Admin), partnerController.deletePartner);  // Delete a partner by ID

// ✅ Get all partners of a specific profile (avoids conflict with `/:id`)
router.route("/profile/:profileId")
    .get(partnerController.getPartnersByProfile);

module.exports = router;

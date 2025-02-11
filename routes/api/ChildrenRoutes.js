const express = require("express");
const router = express.Router();
const childrenController = require("../../controllers/profile/ChildrenController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// ✅ Get all children & Create a new child
router.route("/")
    .get(childrenController.getAllChildren)  // Get all children
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), childrenController.createChild);  // Create a new child

// ✅ Get, Update, Delete a specific child by ID
router.route("/:id")
    .get(childrenController.getChildById)  // Get a specific child by ID
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), childrenController.updateChild)  // Update a child by ID
    .delete(verifyRoles(ROLES_LIST.Admin), childrenController.deleteChild);  // Delete a child by ID

// ✅ Get all children of a specific profile
router.route("/:profileId")
    .get(childrenController.getChildrenByProfile);  // Fetch children linked to a profile

module.exports = router;

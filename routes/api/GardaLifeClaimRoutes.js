const express = require("express");
const router = express.Router();
const gardaLifeClaimController = require("../../controllers/claims/gardaLifeClaimController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// Routes for handling Garda Life Assurance Claims
router.route("/")
    .get(gardaLifeClaimController.getAllGardaLifeClaims)  // Get all claims
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), gardaLifeClaimController.createGardaLifeClaim);  // Create a new claim

router.route("/:id")
    .get(gardaLifeClaimController.getGardaLifeClaimById)  // Get a specific claim by ID
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), gardaLifeClaimController.updateGardaLifeClaim)  // Update a claim by ID
    .delete(verifyRoles(ROLES_LIST.Admin), gardaLifeClaimController.deleteGardaLifeClaim);  // Delete a claim by ID

router.route("/:profileId")
    .get(gardaLifeClaimController.getGardaLifeClaimsByProfile);  // Get all claims for a specific profile

module.exports = router;

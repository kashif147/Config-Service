const express = require("express");
const router = express.Router();
const transferRequestController = require("../../controllers/transferRequest/TransferRequestController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/")
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), transferRequestController.createTransferRequest) // Create Transfer Request
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), transferRequestController.getAllTransferRequests); // Get all Transfer Requests

router.route("/:id")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), transferRequestController.getTransferRequestById) // Get a specific Transfer Request by ID
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), transferRequestController.updateTransferRequest) // Update Transfer Request
    .delete(verifyRoles(ROLES_LIST.Admin), transferRequestController.deleteTransferRequest); // Delete Transfer Request

router.route("/:profileId")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), transferRequestController.getTransferRequestsByProfileId); // Get Transfer Requests by Profile ID

module.exports = router;

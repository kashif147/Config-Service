// const express = require("express");
// const router = express.Router();
// const applicationApprovalController = require("../../controllers/applicationApprovalController");
// const { verifyJWT } = require("../../middleware/verifyJWT");
// const { verifyRoles } = require("../../middleware/verifyRoles");
// const ROLES_LIST = require("../../config/roles_list");

// // Apply JWT verification to all routes
// router.use(verifyJWT);

// // Get all pending applications (Admin only)
// router.get("/pending",
//   verifyRoles(ROLES_LIST.Admin),
//   applicationApprovalController.getAllPendingApplications
// );

// // Get single pending application (Admin only)
// router.get("/pending/:personalDetailsId",
//   verifyRoles(ROLES_LIST.Admin),
//   applicationApprovalController.getPendingApplication
// );

// // Approve application (Admin only)
// router.put("/approve/:personalDetailsId",
//   verifyRoles(ROLES_LIST.Admin),
//   applicationApprovalController.approveApplication
// );

// // Reject application (Admin only)
// router.put("/reject/:personalDetailsId",
//   verifyRoles(ROLES_LIST.Admin),
//   applicationApprovalController.rejectApplication
// );

// module.exports = router;

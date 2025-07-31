const express = require("express");
const router = express.Router();
const lookupController = require("../../controllers/lookupController.js");
const ROLES_LIST = require("../../config/roles_list.js");
const verifyRoles = require("../../middleware/verifyRoles.js");

router
  .route("/")
  .get(lookupController.getAllLookup)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), lookupController.createNewLookup)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), lookupController.updateLookup)
  .delete(verifyRoles(ROLES_LIST.Admin), lookupController.deleteLookup);

router.route("/:id").get(lookupController.getLookup);

module.exports = router;

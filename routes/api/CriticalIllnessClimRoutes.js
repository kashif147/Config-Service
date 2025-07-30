const express = require('express');
const router = express.Router();
const criticalIllnessController = require('../../controllers/claims/CriticalIllnessController');
const ROLES_LIST = require('../../config/roles_list'); // Make sure this points to your roles file
const verifyRoles = require('../../middleware/verifyRoles');

// Routes for handling Critical Illness Scheme
router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), criticalIllnessController.createCriticalIllnessScheme)  // Create a new Critical Illness Scheme
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), criticalIllnessController.getAllCriticalIllnessSchemes); // Get all Critical Illness Schemes

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), criticalIllnessController.getCriticalIllnessSchemeById) // Get a specific Critical Illness Scheme by ID
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), criticalIllnessController.updateCriticalIllnessScheme)  // Update a Critical Illness Scheme by ID
    .delete(verifyRoles(ROLES_LIST.Admin), criticalIllnessController.deleteCriticalIllnessScheme); // Delete a Critical Illness Scheme by ID

router.route('/:profileId')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), criticalIllnessController.getCriticalIllnessSchemesByProfileId); // Get all Critical Illness Schemes for a specific profile

module.exports = router;
 
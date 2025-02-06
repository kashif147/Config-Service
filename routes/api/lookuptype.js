const express = require('express');
const router = express.Router();
const lookuptypeController = require('../../controllers/lookuptypeController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');


router.route('/')
    .get(lookuptypeController.getAllLookupType)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),lookuptypeController.createNewLookupType)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),lookuptypeController.updateLookupType)
    .delete(verifyRoles(ROLES_LIST.Admin),lookuptypeController.deleteLookupType);
    

 router.route('/:id')
     .get(lookuptypeController.getLookupType);

module.exports = router;
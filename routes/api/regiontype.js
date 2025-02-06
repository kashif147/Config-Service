const express = require('express');
const router = express.Router();
const regiontypeController = require('../../controllers/regiontypeController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/')
    .get(regiontypeController.getAllRegionTypes)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regiontypeController.createNewRegionType)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regiontypeController.updateRegionType)
    .delete(verifyRoles(ROLES_LIST.Admin),regiontypeController.deleteRegionType);
    

 router.route('/:id')
     .get(regiontypeController.getRegionType);

module.exports = router;

const express = require('express');
const router = express.Router();
const regionController = require('../../controllers/regionController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');


router.route('/')
    .get(regionController.getAllRegions)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regionController.createNewRegion)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regionController.updateRegion)
    .delete(verifyRoles(ROLES_LIST.Admin),regionController.deleteRegion);
    

  router.route('/:id')
      .get(regionController.getRegion);


  router.route('/RegionTypeID/:RegionTypeID?/ParentRegion/:ParentRegion?')
     .get(regionController.getRegionWithType);


module.exports = router;

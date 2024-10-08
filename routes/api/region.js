const express = require('express');
const router = express.Router();
const regionController = require('../../controllers/regionController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

/**
 * @swagger
 * /api/region:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
router.route('/')
    .get(regionController.getAllRegions)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regionController.createNewRegion)
   // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regiontypeController.updateRegionType)
    //.delete(verifyRoles(ROLES_LIST.Admin),regiontypeController.deleteRegionType);
    

//  router.route('/:id')
//      .get(regionController.getRegion);


     router.route('/RegionTypeID/:RegionTypeID?/ParentRegion/:ParentRegion?')
     .get(regionController.getRegionWithType);


module.exports = router;

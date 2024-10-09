const express = require('express');
const router = express.Router();
const regiontypeController = require('../../controllers/regiontypeController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');



router.route('/')
/**
 * @swagger
 * /regiontype:
 *   get:
 *     summary: Retrieve all region types
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *     responses:
 *       200:
 *         description: A list of region types
 */
    .get(regiontypeController.getAllRegionTypes)
/**
 * @swagger
 * /regiontype:
 *   post:
 *     summary: Create a new region type
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *     responses:
 *       200:
 *         description: A list of regiontypes
 */
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regiontypeController.createNewRegionType)
/**
 * @swagger
 * /regionType:
 *   put:
 *     summary: Update a region type
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *     responses:
 *       200:
 *         description: A list of regiontypes
 */
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),regiontypeController.updateRegionType)
/**
 * @swagger
 * /regionType/[id]:
 *   delete:
 *     summary: delete a region type
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *     responses:
 *       200:
 *         description: A list of regiontypes
 */
    .delete(verifyRoles(ROLES_LIST.Admin),regiontypeController.deleteRegionType);
    

    /**
 * @swagger
 * /regiontype/[id]:
 *   get:
 *     summary: Retrieve a sepcific region type by id
 *     responses:
 *       200:
 *         description: A list of examples
 */
 router.route('/:id')
     .get(regiontypeController.getRegionType);

module.exports = router;

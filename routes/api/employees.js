const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController.js'); 
const ROLES_LIST = require('../../config/roles_list.js'); 
const verifyRoles = require('../../middleware/verifyRoles.js') 

/**
 * @swagger
 * /api/regiontype:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmployee);

    /**
 * @swagger
 * /api/regiontype:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;
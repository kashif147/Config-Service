const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
router.get('/', logoutController.handleLogout);

module.exports = router;
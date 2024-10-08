const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
router.post('/', registerController.handleNewUser);

module.exports = router;
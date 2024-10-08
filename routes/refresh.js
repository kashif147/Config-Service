const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
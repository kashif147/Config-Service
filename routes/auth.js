const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Get access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: 'username'
 *               pwd:
 *                 type: string
 *                 example: 'password'
 *     responses:
 *       200:
 *         description: Bearer token
 */

router.post("/", authController.handleLogin);
router.post("/microsoft", authController.handleMicrosoftCallback);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");

// /**
//  * @swagger
//  * /auth:
//  *   post:
//  *     summary: Get access token
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               user:
//  *                 type: string
//  *                 example: 'username'
//  *               pwd:
//  *                 type: string
//  *                 example: 'password'
//  *     responses:
//  *       200:
//  *         description: Bearer token
//  */

// router.post("/", authController.handleLogin);

// module.exports = router;

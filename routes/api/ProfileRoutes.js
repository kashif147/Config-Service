const express = require("express");
const router = express.Router();
const ProfileController = require('../../controllers/AddProfileController');

router.route('/')
    .post(ProfileController.createProfile)
    .get(ProfileController.getAllProfile);

router.route('/:id')
    .get(ProfileController.getUserByProfile)
    .put(ProfileController.updateProfile)
    .delete(ProfileController.deleteProfile);

module.exports = router;

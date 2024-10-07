const express = require('express');
const router = express.Router();
const contactTypeController = require('../../controllers/contactTypeController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/')
    .get(contactTypeController.getAllContactType)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),contactTypeController.createNewContactType)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),contactTypeController.updateContactType)
    .delete(verifyRoles(ROLES_LIST.Admin),contactTypeController.deleteContactType);
    

 router.route('/:id')
     .get(contactTypeController.getContactType);

module.exports = router;

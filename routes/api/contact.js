const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contactController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');


router.route('/')
    .get(contactController.getAllContact)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),contactController.createNewContact)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),contactController.updateContact)
    .delete(verifyRoles(ROLES_LIST.Admin),contactController.deleteContact);
    

  router.route('/:id')
      .get(contactController.getContact);


module.exports = router;
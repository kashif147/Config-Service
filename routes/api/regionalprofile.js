const express = require('express');
const router = express.Router();
const registeregionController = require('../../controllers/registerRegionController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');


//router.route('/')
  //  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), registeregionController.createRegionProfile)
    
  
module.exports = router;

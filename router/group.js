const express = require("express");
const router = express.Router();
const Controllers=require('../controllers/group')
const authorizationMiddleware=require('../middleware/auth');
router.post('/addGroup',authorizationMiddleware.authorization,Controllers.addGroup);
router.get('/getAllGroup',authorizationMiddleware.authorization,Controllers.getAllGroup);
router.post('/addUserGroup',Controllers.addUserGroup);
router.get('/adminChecks',authorizationMiddleware.authorization,Controllers.adminChecks)
router.post('/addAdminGroup',Controllers.addAdminGroup)
router.get("/groupUser",Controllers.groupUser);
router.post("/deleteUserGroup", Controllers.deleteUserGroup);
module.exports=router
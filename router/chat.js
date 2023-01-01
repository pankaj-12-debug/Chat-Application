const express=require('express');
const router=express.Router();
const controllers=require('../controllers/chat');
const authorizationMiddleware=require('../middleware/auth');
router.post('/sendMessage',authorizationMiddleware.authorization,controllers.sendMessage);
module.exports=router;
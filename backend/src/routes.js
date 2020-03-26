const express=require('express');
const router=express.Router();
const crypto=require('crypto')

const connection=require('./database/connection')
const ongs_controller=require('./controllers/ongs_controller')
const incident_controller=require('./controllers/incident_controller')
const profile_controller=require('./controllers/profileController')
const sessionController=require('./controllers/sessionController')

router.get('/ongs',ongs_controller.index)

router.post('/ongs',ongs_controller.create)

router.post('/incidents', incident_controller.create )

router.get('/incidents',incident_controller.index)

router.delete('/incidents/:id', incident_controller.delete)

router.get("/profile",profile_controller.index)

router.post('/sessions',sessionController.create)

module.exports=router;
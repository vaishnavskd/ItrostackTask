const express = require('express')
const router = express.Router()
const controller = require('../controller/hospitalController')
const departmentModel=require('../db/departmentModel')

router.post('/login', controller.Login)
router.get('/appointments',controller.appointmentsView)
router.get('/search',controller.searchAppointments)
router.get('/group',controller.groupAppointments)
router.get('/departments',async(req,res)=>{
    try {
        const data=await departmentModel.find()
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router

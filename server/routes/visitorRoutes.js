const express = require('express')
const router = express.Router()
const controller = require('../controller/visitorController')

router.post('/create', controller.createAppointment)

module.exports = router
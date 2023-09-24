const express = require("express")
const router = express.Router()
const ApiController = require('../controllers/ApiController')

/**
 * App routes
 */
router.post('/request-service', ApiController.requestService)
router.post('/become-caregiver', ApiController.becomeCaregiver)

module.exports = router
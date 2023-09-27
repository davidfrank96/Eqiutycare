const express = require("express")
const router = express.Router()
const AppController = require('../controllers/AppController')

/**
 * App routes
 */
router.get('/client-profile', AppController.getClientProfile)

module.exports = router
const express = require("express")
const router = express.Router()
const AppController = require('../controllers/AppController')

/**
 * App routes
 */
router.get('/', AppController.homepage)

module.exports = router
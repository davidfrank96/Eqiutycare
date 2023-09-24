const express = require("express")
const router = express.Router()
const AppController = require('../controllers/AppController')

/**
 * App routes
 */
router.get('/', AppController.homepage)
router.get('/about', AppController.aboutpage)
router.get('/services', AppController.servicespage)

module.exports = router
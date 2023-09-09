const express = require('express')
const router = express.Router()
const { register, login, updateUser } = require('../controllers/auth')
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/testUserLimiter');

const rateLimiter = require('express-rate-limit')
const apiLimiter = rateLimiter({
    windowMs:  15*60 * 1000, // 15 minutes
	max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message:{msg:'too many request, try again in 15 mins'},
    
})
router.post('/register', apiLimiter, register)
router.post('/login',apiLimiter, login)
router.patch('/updateUser', authenticateUser, testUser, updateUser)

module.exports = router

const express = require('express')
const testUser = require('../middleware/testUserLimiter');

const router = express.Router()
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  getStats
} = require('../controllers/jobs')

router.route('/').post(testUser,createJob).get(getAllJobs)
router.route('/stats').get(getStats)
router.route('/:id').get(getJob).delete(testUser,deleteJob).patch(testUser,updateJob)

module.exports = router

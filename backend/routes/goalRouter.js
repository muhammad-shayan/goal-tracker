const express = require('express')
const { updateGoal, delGoal, setGoals, getGoals } = require('../controller/goalController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protect,getGoals).post(protect,setGoals)

router.route('/:id').put(protect,updateGoal).delete(protect,delGoal)

module.exports = router

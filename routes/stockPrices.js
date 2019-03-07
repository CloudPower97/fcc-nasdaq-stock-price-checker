const express = require('express')
const router = express.Router()

const { getPrices } = require('../controllers/stockPrices')

router.get('/', getPrices)

module.exports = router

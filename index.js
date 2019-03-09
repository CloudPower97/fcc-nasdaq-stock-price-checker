const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const stockPricesRouter = require('./routes/stockPrices')
const mongoose = require('mongoose')

const { PORT, MONGODB_URI } = process.env

mongoose.set('useFindAndModify', false)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).catch(err => {
  console.error(err)
})

module.exports = express()
  .use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
        },
      },
    })
  )
  .use(cors())
  .use(express.json())
  .use(
    express.urlencoded({
      extended: false,
    })
  )
  .use('/api/stock-prices', stockPricesRouter)
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })

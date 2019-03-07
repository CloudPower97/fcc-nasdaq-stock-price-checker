const stockApi = require('../stockApi')
const StockLikes = require('../models/stockLikes')

exports.getPrices = ({ ip, query: { stock, like } }, res) => {
  const companies = Array.isArray(stock) ? stock.join(',') : stock

  StockLikes.findOneAndUpdate({ stock }, { $set: { stock } }, { upsert: true })
    .then(stockLikes => {
      if (stockLikes && like && !stockLikes.ip.includes(ip)) {
        stockLikes.ip.unshift(ip)
        stockLikes.likes = stockLikes.likes + 1
        stockLikes.save()
      }

      stockApi
        .get(`${companies}`)
        .then(({ data: stocks }) => {
          let stockData = JSON.parse(stocks.replace(/<\/?pre>/g, ''))

          stockData = Object.entries(stockData).map(([stock, price]) =>
            Object.assign(
              {
                stock,
                likes: (stockLikes && stockLikes.likes) || like ? 1 : 0,
              },
              price
            )
          )

          res.json({ stockData })
        })
        .catch(err => {
          res.status(400).json(err)
        })
    })
    .catch(err => {
      res.json({ oo: 'dwa' })
    })
}

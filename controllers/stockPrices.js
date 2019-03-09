const stockApi = require('../stockApi')
const StockLikes = require('../models/stockLikes')

exports.getPrices = ({ ip, query: { stock, like } }, res) => {
  if (!Array.isArray(stock)) {
    StockLikes.findOneAndUpdate({ stock }, { $set: { stock } }, { upsert: true })
      .then(stockLikes => {
        if (stockLikes && like && !stockLikes.ip.includes(ip)) {
          stockLikes.ip.unshift(ip)
          stockLikes.likes = stockLikes.likes + 1
          stockLikes.save()
        }

        stockApi
          .get(`${stock}`)
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
        res.json(err)
      })
  } else {
    // TODO: Find a better way to handle the case where Promise.all fails
    Promise.all(
      stock.map(stock =>
        StockLikes.findOneAndUpdate({ stock }, { $set: { stock } }, { upsert: true })
      )
    )
      .then(stockLikes => {
        stockApi
          .get(`${stock.join(',')}`)
          .then(({ data: stocks }) => {
            let stockData = JSON.parse(stocks.replace(/<\/?pre>/g, ''))

            stockData = Object.entries(stockData).map(([stock, price], index) => {
              return Object.assign(
                {
                  stock,
                  rel_likes:
                    (stockLikes[index] &&
                      stockLikes[index > 0 ? index - 1 : index + 1] &&
                      stockLikes[index].likes -
                        stockLikes[index > 0 ? index - 1 : index + 1].likes) ||
                    0,
                },
                price
              )
            })

            res.json({ stockData })
          })
          .catch(err => {
            res.status(400).json(err)
          })
      })
      .catch(err => {
        stockApi
          .get(`${stock.join(',')}`)
          .then(({ data: stocks }) => {
            let stockData = JSON.parse(stocks.replace(/<\/?pre>/g, ''))

            stockData = Object.entries(stockData).map(([stock, price], index) => {
              return Object.assign(
                {
                  stock,
                  rel_likes:
                    (stockLikes[index] &&
                      stockLikes[index > 0 ? index - 1 : index + 1] &&
                      stockLikes[index].likes -
                        stockLikes[index > 0 ? index - 1 : index + 1].likes) ||
                    0,
                },
                price
              )
            })

            res.json({ stockData })
          })
          .catch(err => {
            res.status(400).json(err)
          })
      })
  }
}

const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../index')

chai.use(chaiHttp)

suite('Functional Tests', function() {
  suite('GET /api/stock-prices => stockData object', function() {
    let numLikes = 0

    test('1 stock', done => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog' })
        .end((err, { status, body: { stockData: { stock, price, likes } } }) => {
          assert.equal(status, 200)
          assert.equal(stock, 'goog')
          assert.isNumber(price)
          assert.isNumber(likes)
          done()
        })
    })

    test('1 stock with like', done => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end((err, { status, body: { stockData: { stock, likes } } }) => {
          numLikes = likes
          assert.equal(status, 200)
          assert.equal(stock, 'goog')
          assert.isAtLeast(likes, 1)
          done()
        })
    })

    test('1 stock with like again (ensure likes arent double counted)', done => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end((err, { status, body: { stockData: { stock, likes } } }) => {
          assert.equal(status, 200)
          assert.equal(stock, 'goog')
          assert.equal(likes, numLikes)
          done()
        })
    })

    test('2 stocks', done => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['goog', 'msft'], like: 'true' })
        .end((err, { status, body: { stockData } }) => {
          assert.equal(status, 200)
          assert.isArray(stockData)
          assert.lengthOf(stockData, 2)
          assert.equal(stockData[0].stock, 'goog')
          assert.equal(stockData[1].stock, 'msft')
          done()
        })
    })

    // test('2 stocks with like', done => {
    //   chai
    //     .request(server)
    //     .get('/api/stock-prices')
    //     .query({ stock: 'goog', stock: 'msft', like: true })
    //     .end((err, { status, body: { stockData } }) => {
    //       assert.equal(status, 200)
    //       assert.equal(stockData[0].stock, 'goog')
    //       assert.equal(stockData[1].stock, 'msft')
    //       done()
    //     })
    // })
  })
})

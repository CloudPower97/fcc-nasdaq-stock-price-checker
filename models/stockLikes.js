const { Schema, model } = require('mongoose')

const stockLikes = new Schema({
  stock: {
    type: String,
    required: true,
  },
  ip: [
    {
      type: String,
      required: true,
    },
  ],
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
})

module.exports = model('StockLikes', stockLikes)

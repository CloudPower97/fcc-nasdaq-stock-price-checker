const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://financialmodelingprep.com/api/company/price/',
})

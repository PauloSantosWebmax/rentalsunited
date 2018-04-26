
const configs = require('./configs')
const axios = require('axios')

const RURequest = (method) => {
  return axios.post(configs.endpoint, method, configs.options)
}

module.exports = RURequest


let axios = require('axios')
let rentalsUnited = require('./configs')

module.exports = (method) => {
    axios.post(rentalsUnited.endpoint, method, rentalsUnited.options)
    .then(data => data)
    .catch(err => res.send(err));
}

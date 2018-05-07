// fixer api key 9f34a42fdf4965543e3dceaf10cad6b6
// http://data.fixer.io/api/latest?access_key=9f34a42fdf4965543e3dceaf10cad6b6&base=usd

// https://restcountries.eu/rest/v2/currency/usd

const axios = require('axios')

const fixerApiKey = '9f34a42fdf4965543e3dceaf10cad6b6'

const getExchangeRate = (from, to) => {
    return axios.get(`http://data.fixer.io/api/latest?access_key=${fixerApiKey}&base=${from}`).then((response) => {
        return response.data.rates[to]
    })
}

getExchangeRate('EUR', 'CAD').then((rate) => {
    console.log(rate)
})
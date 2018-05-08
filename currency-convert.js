// fixer api key 9f34a42fdf4965543e3dceaf10cad6b6
// http://data.fixer.io/api/latest?access_key=9f34a42fdf4965543e3dceaf10cad6b6&base=usd

// https://restcountries.eu/rest/v2/currency/usd

const axios = require('axios')

const fixerApiKey = '9f34a42fdf4965543e3dceaf10cad6b6'

const getExchangeRate = (from, to) => {
    const fixerUrl = `http://data.fixer.io/api/latest?access_key=${fixerApiKey}&base=${from}`
    return axios.get(fixerUrl).then((response) => {
        return response.data.rates[to]
    })
}

const getCountries = (currencyCode) => {
    const restCountriesUrl = `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    return axios.get(restCountriesUrl).then((response) => {
        return response.data.map((country) => country.name)
    })
}

const convertCurrency = (from, to, amount) => {
    let countries
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries
        return getExchangeRate(from, to)
    }).then((rate) => {
        const exchangedAmount = amount * rate

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`
    })
}

// Create converCurrencyAlt as async function
// Get countries and rate using await and our two functions
// Calculate exchangedAmount
// return status string

const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to)
    const rate = await getExchangeRate(from, to)
    const exchangedAmount = amount * rate

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`
}

// getExchangeRate('EUR', 'CAD').then((rate) => {
//     console.log(rate)
// })

// getCountries('CAD').then((countries) => {
//     console.log(countries)
// })

// convertCurrency('EUR', 'BRL', 100).then((status) => {
//     console.log(status)
// })

convertCurrencyAlt('EUR', 'USD', 100).then((status) => {
    console.log(status)
})
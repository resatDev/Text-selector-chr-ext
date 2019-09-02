/**
 * 
 * @param {string} unit 
 * @return {JSONObject}
 */

export const currencyExchange = (unit) => {
    return fetch('https://api.exchangeratesapi.io/latest')

    .then(function(response) {
        return response.json();
    })

    .then(function(myJson) {
        let currrency = JSON.stringify(myJson['rates'][unit])
        return(currrency);
    })
}

/**
 * 
 * @param {string} selectedText 
 * @return {array}
 */
export const checkCurrency = (selectedText) => {
    var currency = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"]
    let splitting = selectedText.split(' ');
    return splitting.filter(item => {
        return currency.join(' ').includes(item) &&  item.length == 3
    })
}
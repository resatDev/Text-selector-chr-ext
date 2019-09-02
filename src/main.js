import ManagerDefault from './managerDefault';
import { getSelected } from './getSelected'
import { getPosition } from './getPosition'
import { currencyExchange, checkCurrency } from './getCurrency'
import { isNumber } from './checkNumber'
import { parseCalculationString, calculate } from './numericCalc'
import { clockAmConv, clockPmConv } from './clockConverter'
import { isDegree } from './degreeConverter'
import { isQuote } from './quoting'
import { twitter, tumblr } from './socialMedia'


window.addEventListener('click', (event) => {
    //mouse click coordinates
    const [cordX, cordY] = getPosition(event);

    //selected object
    const selectedString = getSelected();

    //ManagerDefault object
    let selectionPopup = new ManagerDefault(selectedString, cordX, cordY)

    if(selectedString && !document.querySelector('.textSelector') && !document.querySelector('.textSelectorDefault')){ 
        
        //JotForm Processing
        if(selectedString.slice(0, 7) == 'JotForm'){
            if(!localStorage.getItem('jotFormLoginAppKey')){
                selectionPopup.setPopupConfigJotFormLogin()
            }
            else{
                selectionPopup.setPopupConfigJotForm('Your form question and link: ', `https://form.jotform.com/${localStorage.getItem('jotFormID')}`)
            }
        }
        
        //If selected string contains currency exchange
        else if(checkCurrency(selectedString).length){
            currencyExchange(checkCurrency(selectedString))
                .then((res) => {
                    selectionPopup.setPopupConfig('Currency Exchange', (isNumber(selectedString) / res).toString() + ' EURO')
                })
            }

        //If string contains degree unit => Kelvin
        else if(isDegree(selectedString).toUpperCase() == 'K'){
            selectionPopup.setPopupConfig('Degree Converter', (Number(isNumber(selectedString)[0]) + 273).toString())
        }

        //If string contains degree unit => Fahrenhiet
        else if(isDegree(selectedString).toUpperCase() == 'F'){
            selectionPopup.setPopupConfig('Degree Converter', ((Number(isNumber(selectedString)[0]) - 32)*(5/9)).toString()  + ' C')
        }
        //If selected string contains clock unit => AM
        else if(selectedString.split(' ')[0] != selectedString && selectedString.split(" ")[1].toUpperCase() == 'AM'){
            selectionPopup.setPopupConfig('Clock Converter', clockAmConv(selectedString))
        }
        
        //If selected string contains clock unit => PM
        else if(selectedString.split(' ')[0] != selectedString && selectedString.split(" ")[1].toUpperCase() == 'PM'){
            selectionPopup.setPopupConfig('Clock Converter', clockPmConv(selectedString))
        }

        //If string contains basic mathematic calculation
        else if(calculate(parseCalculationString(selectedString))){
            selectionPopup.setPopupConfig('Basic Numerical Calculation', (calculate(parseCalculationString(selectedString))).toString())
        }

        //If string contains a quotation for social media => twitter
        else if(isQuote(selectedString)[1] == 'twitter'){
            twitter(isQuote(selectedString)[0])
        }

        //If string contains a quotation for social media => twitter
        else if(isQuote(selectedString)[1] == 'tumblr'){
            tumblr(isQuote(selectedString)[0])
        }


        //If string is unqualified
        else{
            selectionPopup.setPopupConfigDefault()
        }
    }

})

var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('./../assests/style.css');
(document.head||document.documentElement).appendChild(style);

var fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.type = 'text/css';
fontAwesome.href = chrome.extension.getURL('https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
(document.head||document.documentElement).appendChild(fontAwesome);


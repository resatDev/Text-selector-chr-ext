import ManagerDefault from './managerDefault';
import { getPosition } from './getPosition'
import { currencyExchange, checkCurrency } from './getCurrency'
import { isNumber } from './checkNumber'
import { parseCalculationString, calculate } from './numericCalc'
import { clockAmConv, clockPmConv } from './clockConverter'
import { isDegree } from './degreeConverter'
import { isQuote } from './quoting'
import { twitter, tumblr } from './socialMedia'

var selectedChangingText = []
var selectedForMouseBool = false;
var selectedForMouse = '';

window.addEventListener('mousedown', () => {
    selectedForMouseBool = true;
})
window.addEventListener('mouseup', () => {
    let selected = document.getSelection().toString();
    if(selected){
        selectedForMouse = selected;
        textSelectorEvent(selectedForMouse)
    }
    selectedForMouseBool = false;
})

document.addEventListener('selectionchange', () => {
    selectedChangingText.push(document.getSelection().toString())
    if(selectedChangingText[selectedChangingText.length-1] != selectedForMouse && !selectedForMouseBool){
        textSelectorEvent(selectedChangingText[selectedChangingText.length-1])
    }
})


const textSelectorEvent = (selectedtextmixed) => {
    //mouse click coordinates
    const [cordX, cordY] = getPosition(event);

    //selected object
    const selectedString = selectedtextmixed;

    //ManagerDefault object
    let selectionPopup = new ManagerDefault(selectedString, cordX, cordY)

    if(selectedString != '' && !document.querySelector('.textSelector') && !document.querySelector('.textSelectorDefault')){ 
        
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


        //If string contains a quotation for social media => twitter
        else if(isQuote(selectedString)[1] == 'twitter'){
            twitter(isQuote(selectedString)[0])
        }

        //If string contains a quotation for social media => twitter
        else if(isQuote(selectedString)[1] == 'tumblr'){
            tumblr(isQuote(selectedString)[0])
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

        //If string is unqualified
        else{
            selectionPopup.setPopupConfigDefault()
        }
    }
    selectedChangingText = []
    selectedForMouse = '' 
}




      
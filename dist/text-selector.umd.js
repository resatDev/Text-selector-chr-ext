(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    /**
     * Check 
     * @param {selectedText} string
     * is quote or not
     * @return array
     */
    const isQuote = (selectedText) => {
        const slicing = selectedText.split(':');
        return [slicing[0], slicing[1]]
    };

    /**
     * 
     * @param {string} selectedText 
     */

    //taking header
    const jotform_header = (selectedText) => {
        let parcing = selectedText.split('\n');
        let header =  parcing.filter((item) => {
            if(item.indexOf(' ') == 0){
                return item
            }
        });
        return [header, 'head', 1]
    };

    //taking questions
    const jotform_question = (selectedText) => {
        let parcing = selectedText.split('\n');

        let questions = parcing.filter((item) => {
            if(Number(item[0]) && item[1] == '.'){
                return item
            }
        });

        let qid = parcing.filter((item) => {
            if(Number(item[0]) && item[1] == '.'){
                return item
            }
        });
        return [questions, 'textbox', qid]
    };

    //creating an object about questions
    const jotformFormItem = (field_type, field_text, qid) => {
        let a = {};
        if(qid == 1){
            a[`properties[title]`] = `${field_text}`;
        }
        a[`questions[${qid}][type]`] = `control_${field_type}`;
        a[`questions[${qid}][name]`] = `${field_text}`;
        a[`questions[${qid}][text]`] = `${field_text}`;
        a[`questions[${qid}][order]`] = `${qid}`;

        return a
    };

    //social media about jotform
    const social_jotform = (selectedText) => {
        let parcing = selectedText.split('\n');
        return parcing.filter((item) => {
            if(item.slice(0,2) == '::'){
                return item
            }
        })
    };

    /**
         * 
         * @param {string} selectedText 
         */

        const twitter = (selectedText) => {
            var currentQuote = isQuote(selectedText);
            var twitter_windows = window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(currentQuote));
            if(twitter_windows.focus){
                twitter_windows.focus();
            }else{
                return false;
            }
        };
    /**
     * 
     * @param {string} selectedText 
     */
        const tumblr = (selectedText) => {
            var currentQuote = isQuote(selectedText);
            var tumblr_windows = window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
            if(tumblr_windows.focus){
                tumblr_windows.focus();
            }
            else{
                return false;
            }
        };

    /**
     * @typedef {object}
     * main manager
     */
    class ManagerDefault {

        /**
         * @constructor
         * @param {selected_text, posX, posY} 
         *
         */

        constructor(selected_text, posX, posY){
            this.selected_text = selected_text;
            this.posX = posX;
            this.posY = posY;
            this.isQuote = isQuote;
        }

        //   

        /**
         * Create new pop-up which contain
         * @selected_text
         * and at the position of
         * @posX
         * @posY
         */

        makePopUpDefault () {
            let new_div = document.createElement('div');
            new_div.className += 'textSelector';
            new_div.innerHTML = `
            <div id="popUp">
                <div id="textArea" class="style-1">
                    <div id="close">
                        <b>Close</b>
                    </div>
                    <div id="selectedText">
                        ${this.selected_text}
                    </div>
                </div>
                <div id="socialMedia">
                    <a href="#" class="fa fa-twitter"></a>
                    <a href="#" class="fa fa-tumblr"></a>
                    <a href="#" class="fa fa-volume-up"></a>
                </div>
            </div>        
            `;
                new_div.style.cssText = `
                left: ${this.posX}px;
                top: ${this.posY}px;
            `;
                document.body.appendChild(new_div);

        }

        /**
         * creating div qualified
         */
        makePopUp (headingText, calcResult) {
            let new_div = document.createElement('div');
            new_div.className += 'textSelector';
            new_div.innerHTML = `
        <div id="textSelector">
            <div id="popUp2">
                <div id="textArea2" class="style-1">
                    <div id="close"><b>Close</b></div>
                    <div id="header">
                        <b>${headingText}</b>
                    </div><hr>
                    <div id="selectedText">
                        <p>${this.selected_text}<p/> = <span>${calcResult}</span>  
                    </div>
                </div>
            </div>
        </div>
        `;
            new_div.style.cssText = `
            left: ${this.posX}px;
            top: ${this.posY}px;
        `;
            document.body.appendChild(new_div);

        }

        /**
         * creating div qualified => JotForm
         */
        makePopUpJotForm (headingText, calcResult) {
            let new_div = document.createElement('div');
            new_div.className += 'textSelector';
            new_div.innerHTML = `
            <div id="popUp">
                <div id="textArea" class="style-1">
                    <div id="close"><b>Close</b></div>
                    <div id="header">
                        <b>${headingText}</b>
                    </div><hr>
                    <div id="selectedText">
                        <span>${calcResult}</span>  
                    </div>
                </div>
            </div>
        `;
            new_div.style.cssText = `
            left: ${this.posX}px;
            top: ${this.posY}px;
        `;
            document.body.appendChild(new_div);
            document.querySelector('#close').addEventListener('click', () => {
                document.querySelector('.textSelector').remove();
            });

        }

        /**
         * creating div JotFrom
         */
        jotformLoginPopUp () {
            let new_div = document.createElement('div');
            new_div.className += 'textSelector';
            new_div.innerHTML = `
        <div id="jotform_login">
            <div class="logo">
                <img src="./jotform.png" alt="Jotform Logo">
                <div id="close"> <b>Close </b> </div>
            </div>
            <div id="login">
                <div class="row">
                    <input type="text" placeholder="Username" id="uname">
                </div>
                <div class="row">
                    <input type="password" placeholder="Password" id="pass">
                </div>
                <div class="row">
                    <button class='waves-effect waves-light btn' id="checkLogin">Login</button>
                </div>
            </div>
            <div id="error">asfsdafadsfdsafadsfsfa</div>
        </div>
        `;
            new_div.style.cssText = `
            left: ${this.posX}px;
            top: ${this.posY}px;
        `;
            document.body.appendChild(new_div);

        }

         /**
         * twitter sharing
         */
        twitterSharing () {
            let iconTwitter = document.querySelector('.fa-twitter');
            iconTwitter.addEventListener('mousedown', () => {
                var currentQuote = isQuote(this.selected_text);
                var twitter_windows = window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(currentQuote));
                if(twitter_windows.focus){
                    twitter_windows.focus();
                }else{
                    return false;
                }
            });
         }

        /**
         * tumblr sharing
         */
        tumblrSharing () {
            let iconTumblr = document.querySelector('.fa-tumblr');
            iconTumblr.addEventListener('mousedown', () => {
                var currentQuote = isQuote(this.selected_text);
                var tumblr_windows = window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
                if(tumblr_windows.focus){
                    tumblr_windows.focus();
                }
                else{
                    return false;
                }
            });
        }

        /**
         * Speaking selectedText via with HTML5 Speech Recognition
         * @selectedText
         */
        speakSelectedText () {
            let iconTts = document.querySelector('.fa-volume-up');
            iconTts.addEventListener('mousedown', () => {
                try {
                    var speech = new SpeechSynthesisUtterance(this.selected_text);
                    speech.lang = 'en-US';
                    window.speechSynthesis.speak(speech);
                }
                catch {
                    alert('This browser does not support this features');
                }
            });
        }

        /**
         * close the pop-up
         * @param {closingTagClass}
         */
        close () {
            let closingTagClass = document.querySelector('.textSelector');
            console.log(closingTagClass);
            if(closingTagClass){
                document.getElementById('close').addEventListener('mousedown', () => {
                    closingTagClass.remove();
                });
            }
        }

        login () {
            let checkJotform = document.getElementById('checkLogin');
            checkJotform.addEventListener('click', () => {
                let username = document.getElementById('uname').value;
                let password = document.getElementById('pass').value;
                (async () => {
                    const rawResponse = await fetch(`https://api.jotform.com/user/login?username=${username}&password=${password}&appName=new&access=full`, {
                        method: 'POST',     
                    });
                    const response = await rawResponse.json();
                    if(response.message == "success"){
                        await localStorage.setItem('jotFormLoginAppKey', response.content.appKey);
                        await this.createForm();
                        document.querySelector('#error').innerHTML = `https://form.jotform.com/${localStorage.getItem('jotFormID')}`; 
                    }
                    else if(response.message == 'Too Many Requests'){
                        document.querySelector('#error').innerHTML = 'Temporarly rundown. Please try again a bit time later.';
                    }
                    else{
                        document.querySelector('#error').innerHTML = 'Username or Password is not valid. Please try again!';
                    }
                })();
            });
        }

        createForm () {
            const [field_qText, field_qType, field_qid] = jotform_question(this.selected_text);
            const [field_hText, field_hType, field_hid] = jotform_header(this.selected_text);

            if((field_qText && field_qType && field_qid) || (field_hText && field_hType && field_hid)){
                        
                //creating a form data
                let jotForm = new FormData();

                Object.keys(jotformFormItem(field_hType, field_hText, field_hid)).map((item) => {
                    jotForm.append(item, jotformFormItem(field_hType, field_hText, field_hid)[item]);
                });
                    
                for(let i = 0; i < field_qText.length; i++){
                    Object.keys(jotformFormItem(field_qType, field_qText[i], ((Number(field_qid[i].split('.')[0]))+1).toString())).map((item) => {
                        jotForm.append(item, jotformFormItem(field_qType, field_qText[i], ((Number(field_qid[i].split('.')[0]))+1).toString())[item]);
                    });
                }

                //creating form
                (async () => {
                    const rawResponse2 = await fetch(`https://api.jotform.com/form?apiKey=${localStorage.getItem('jotFormLoginAppKey')}`, {
                    credentials: 'omit',
                    method: 'POST',
                    body: jotForm
                    });
                    const responseForm2 = await rawResponse2.json();
                    localStorage.setItem('jotFormID', responseForm2.content.id);
                

                    //To share the form link in social media => twiiter
                    if(social_jotform(this.selected_text)[0] && social_jotform(this.selected_text)[0].split('::')[1] == 'twitter'){
                            await twitter(`https://form.jotform.com/${localStorage.getItem('jotFormID')}`);
                    }

                    //To share the form link in social media => tumblr
                    else if(social_jotform(this.selected_text)[0] && social_jotform(this.selected_text)[0].split('::')[1] == 'tumblr'){
                            await tumblr(`https://form.jotform.com/${localStorage.getItem('jotFormID')}`);
                        }

            })();
            }

        }
        
        setPopupConfigDefault () {
            this.makePopUpDefault();
            this.tumblrSharing();
            this.twitterSharing();
            this.speakSelectedText();
            this.close();
        }

        setPopupConfig (heading, result) {
            this.makePopUp(heading, result);
            this.close();
            
        }

        setPopupConfigJotFormLogin () {
            this.jotformLoginPopUp();
            this.login();
            this.close();
        }

        setPopupConfigJotForm (heading, result) {
            this.createForm();
            this.makePopUp(heading, result);
            this.close();
        }
    }

    /**
     * @return {string}
     */
    const getSelected = () => {
        if(window.getSelection) { return window.getSelection().toString(); }
        else if(document.getSelection) { return document.getSelection().toString(); }
        else {
            var selection = document.selection && document.selection.createRange();
            if(selection.text) { return selection.text.toString(); }
            return false;
        }
     };

    /**
     * 
     * @param {Event} event
     * @return {Array}
     */
    const getPosition = (event) => {
        return [event.clientX, event.clientY]
    };

    /**
     * 
     * @param {string} unit 
     * @return {JSONObject}
     */

    const currencyExchange = (unit) => {
        return fetch('https://api.exchangeratesapi.io/latest')

        .then(function(response) {
            return response.json();
        })

        .then(function(myJson) {
            let currrency = JSON.stringify(myJson['rates'][unit]);
            return(currrency);
        })
    };

    /**
     * 
     * @param {string} selectedText 
     * @return {array}
     */
    const checkCurrency = (selectedText) => {
        var currency = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"];
        let splitting = selectedText.split(' ');
        return splitting.filter(item => {
            return currency.join(' ').includes(item) &&  item.length == 3
        })
    };

    /**
      * 
      * @param {string} selectedText 
      */

    const isNumber = (selectedText) => {
        return selectedText.split(' ').filter(function(item){
            return isNaN(item) != true 
        })
    };

    /**
     * 
     * @param {string} s
     * @return {array} 
     */
       const parseCalculationString = (s) => {
        var calculation = [],
        current = '';
        for (var i = 0, ch; ch = s.charAt(i); i++) {
            if ('^*/+-'.indexOf(ch) > -1) {
                if (current == '' && ch == '-') {
                    current = '-';
                } else {
                    calculation.push(parseFloat(current), ch);
                    current = '';
                }
            } else {
                current += s.charAt(i);
            }
        }
        if (current != '') {
            calculation.push(parseFloat(current));
        }
        return calculation;
    };

    /**
     * 
     * @param {array} calc 
     * @return {number}
     */
    const calculate = (calc) => {
        var ops = [{'^': (a, b) => Math.pow(a, b)},
        {'*': (a, b) => a * b, '/': (a, b) => a / b},
        {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
        for (var i = 0; i < ops.length; i++) {
            for (var j = 0; j < calc.length; j++) {
                if (ops[i][calc[j]]) {
                    currentOp = ops[i][calc[j]];
                } else if (currentOp) {
                    newCalc[newCalc.length - 1] = 
                        currentOp(newCalc[newCalc.length - 1], calc[j]);
                    currentOp = null;
                } else {
                    newCalc.push(calc[j]);
                }
            }
            calc = newCalc;
            newCalc = [];
        }
        return (calc.length > 1) ? calc : calc[0] 
    };

    /**
     * 
     * @param {string} selected 
     */

    const clockAmConv = (selected) => {
        return selected.split(' ')[0]
     };

     const clockPmConv = (selected) => {
         let clock = (Number(selected.split(' ')[0].split(':')[0]) + 12).toString();
         if(clock == '24'){
             clock = '00';
         }
         return clock + ':' + selected.split(' ')[0].split(':')[1]
     };

    /**
     * 
     * @param {string} selectedText 
     */
    const isDegree = (selectedText) => {
        return selectedText[selectedText.length-1]
    };

    window.addEventListener('click', (event) => {
        //mouse click coordinates
        const [cordX, cordY] = getPosition(event);

        //selected object
        const selectedString = getSelected();

        //ManagerDefault object
        let selectionPopup = new ManagerDefault(selectedString, cordX, cordY);

        if(selectedString && !document.querySelector('.textSelector') && !document.querySelector('.textSelectorDefault')){ 
            
            //JotForm Processing
            if(selectedString.slice(0, 7) == 'JotForm'){
                if(!localStorage.getItem('jotFormLoginAppKey')){
                    selectionPopup.setPopupConfigJotFormLogin();
                }
                else{
                    selectionPopup.setPopupConfigJotForm('Your form question and link: ', `https://form.jotform.com/${localStorage.getItem('jotFormID')}`);
                }
            }
            
            //If selected string contains currency exchange
            else if(checkCurrency(selectedString).length){
                currencyExchange(checkCurrency(selectedString))
                    .then((res) => {
                        selectionPopup.setPopupConfig('Currency Exchange', (isNumber(selectedString) / res).toString() + ' EURO');
                    });
                }

            //If string contains degree unit => Kelvin
            else if(isDegree(selectedString).toUpperCase() == 'K'){
                selectionPopup.setPopupConfig('Degree Converter', (Number(isNumber(selectedString)[0]) + 273).toString());
            }

            //If string contains degree unit => Fahrenhiet
            else if(isDegree(selectedString).toUpperCase() == 'F'){
                selectionPopup.setPopupConfig('Degree Converter', ((Number(isNumber(selectedString)[0]) - 32)*(5/9)).toString()  + ' C');
            }
            //If selected string contains clock unit => AM
            else if(selectedString.split(' ')[0] != selectedString && selectedString.split(" ")[1].toUpperCase() == 'AM'){
                selectionPopup.setPopupConfig('Clock Converter', clockAmConv(selectedString));
            }
            
            //If selected string contains clock unit => PM
            else if(selectedString.split(' ')[0] != selectedString && selectedString.split(" ")[1].toUpperCase() == 'PM'){
                selectionPopup.setPopupConfig('Clock Converter', clockPmConv(selectedString));
            }

            //If string contains basic mathematic calculation
            else if(calculate(parseCalculationString(selectedString))){
                selectionPopup.setPopupConfig('Basic Numerical Calculation', (calculate(parseCalculationString(selectedString))).toString());
            }

            //If string contains a quotation for social media => twitter
            else if(isQuote(selectedString)[1] == 'twitter'){
                twitter(isQuote(selectedString)[0]);
            }

            //If string contains a quotation for social media => twitter
            else if(isQuote(selectedString)[1] == 'tumblr'){
                tumblr(isQuote(selectedString)[0]);
            }


            //If string is unqualified
            else{
                selectionPopup.setPopupConfigDefault();
            }
        }

    });

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

}));

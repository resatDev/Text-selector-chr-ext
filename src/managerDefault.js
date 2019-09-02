import { isQuote } from './quoting';
import { jotform_header, jotform_question, jotformFormItem, social_jotform } from './jotform';
import { twitter, tumblr } from './socialMedia'

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
            `
            new_div.style.cssText = `
                left: ${this.posX}px;
                top: ${this.posY}px;
            `
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
        `
        new_div.style.cssText = `
            left: ${this.posX}px;
            top: ${this.posY}px;
        `
        document.body.appendChild(new_div)

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
        `
        new_div.style.cssText = `
            left: ${this.posX}px;
            top: ${this.posY}px;
        `
        document.body.appendChild(new_div)
        document.querySelector('#close').addEventListener('click', () => {
            document.querySelector('.textSelector').remove();
        })

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
        `
        new_div.style.cssText = `
            left: ${this.posX}px;
            top: ${this.posY}px;
        `
        document.body.appendChild(new_div)

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
        })
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
                window.speechSynthesis.speak(speech)
            }
            catch {
                alert('This browser does not support this features')
            }
        })
    }

    /**
     * close the pop-up
     * @param {closingTagClass}
     */
    close () {
        let closingTagClass = document.querySelector('.textSelector');
        console.log(closingTagClass)
        if(closingTagClass){
            document.getElementById('close').addEventListener('mousedown', () => {
                closingTagClass.remove();
            })
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
                    await this.createForm()
                    document.querySelector('#error').innerHTML = `https://form.jotform.com/${localStorage.getItem('jotFormID')}` 
                }
                else if(response.message == 'Too Many Requests'){
                    document.querySelector('#error').innerHTML = 'Temporarly rundown. Please try again a bit time later.';
                }
                else{
                    document.querySelector('#error').innerHTML = 'Username or Password is not valid. Please try again!';
                }
            })();
        })
    }

    createForm () {
        const [field_qText, field_qType, field_qid] = jotform_question(this.selected_text)
        const [field_hText, field_hType, field_hid] = jotform_header(this.selected_text)

        if((field_qText && field_qType && field_qid) || (field_hText && field_hType && field_hid)){
                    
            //creating a form data
            let jotForm = new FormData();

            Object.keys(jotformFormItem(field_hType, field_hText, field_hid)).map((item) => {
                jotForm.append(item, jotformFormItem(field_hType, field_hText, field_hid)[item])
            })
                
            for(let i = 0; i < field_qText.length; i++){
                Object.keys(jotformFormItem(field_qType, field_qText[i], ((Number(field_qid[i].split('.')[0]))+1).toString())).map((item) => {
                    jotForm.append(item, jotformFormItem(field_qType, field_qText[i], ((Number(field_qid[i].split('.')[0]))+1).toString())[item])
                })
            }

            //creating form
            (async () => {
                const rawResponse2 = await fetch(`https://api.jotform.com/form?apiKey=${localStorage.getItem('jotFormLoginAppKey')}`, {
                credentials: 'omit',
                method: 'POST',
                body: jotForm
                });
                const responseForm2 = await rawResponse2.json();
                localStorage.setItem('jotFormID', responseForm2.content.id)
            

                //To share the form link in social media => twiiter
                if(social_jotform(this.selected_text)[0] && social_jotform(this.selected_text)[0].split('::')[1] == 'twitter'){
                        await twitter(`https://form.jotform.com/${localStorage.getItem('jotFormID')}`)
                }

                //To share the form link in social media => tumblr
                else if(social_jotform(this.selected_text)[0] && social_jotform(this.selected_text)[0].split('::')[1] == 'tumblr'){
                        await tumblr(`https://form.jotform.com/${localStorage.getItem('jotFormID')}`)
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
        this.close()
    }
}

export default ManagerDefault;
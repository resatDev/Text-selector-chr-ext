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

    constructor(selected_text, posX=1350, posY=20){
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
            <div class="popUp">
                <div class="textArea">
                    <div id="close">
                        <b>X</b>
                    </div>
                    <div class="text">
                        ${this.selected_text}
                    </div>
                </div>
                <div class="socialMedia">
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
            document.querySelector('#close').addEventListener('click', () => {
                document.querySelector('.textSelector').remove();
            })

    }

    /**
     * creating div qualified
     */
    makePopUp (headingText, calcResult) {
        let new_div = document.createElement('div');
        new_div.className += 'textSelector';
        new_div.innerHTML = `
        <div id="textSelector">
            <div class="popUp2">
                <div class="textArea2" class="style-1">
                    <div id="close">X</div>
                    <div classs="header">
                        <b>${headingText}</b>
                    </div><hr>
                    <div class="text2">
                        <p>${this.selected_text}<p/> = <span>${calcResult}</span>  
                    </div>
                </div>
                <div class="socialMedia2">
                    Text Selector App
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
        <div class="login-wrap">
            <div class="login-html">    
                <div class="closeLogin">CLOSE</div>
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="user" class="label">Username</label>
                            <input id="uname" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Password</label>
                            <input id="pass" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <input type="submit" class="button" value="Sign In" id="checkLogin">
                        </div>
                        <div class="jotForm">
                           <a href="https://turk.jotform.com/myforms" target="_blank"> <img src="./../img/jotform2.png" alt="JotForm Logo"> </a>
                        </div>
                        <div id="error"></div>
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

        document.querySelector('.closeLogin').addEventListener('click', () => {
            document.querySelector('.textSelector').remove();
        })

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
                    localStorage.setItem('jotFormLoginAppKey', response.content.appKey);
                    this.createForm()
                    this.makePopUp('JotForm Link: ', `https://form.jotform.com/${localStorage.getItem('jotFormID')}`)
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
    }

    setPopupConfig (heading, result) {
        this.makePopUp(heading, result);
        
    }

    setPopupConfigJotFormLogin () {
        this.jotformLoginPopUp();
        this.login();
    }

    setPopupConfigJotForm (heading, result) {
        this.createForm();
        this.makePopUp(heading, result);
    }
}

export default ManagerDefault;
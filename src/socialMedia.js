import { isQuote } from './quoting'
    /**
     * 
     * @param {string} selectedText 
     */

    export const twitter = (selectedText) => {
        var currentQuote = isQuote(selectedText);
        var twitter_windows = window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(currentQuote));
        if(twitter_windows.focus){
            twitter_windows.focus();
        }else{
            return false;
        }
    }
/**
 * 
 * @param {string} selectedText 
 */
    export const tumblr = (selectedText) => {
        var currentQuote = isQuote(selectedText);
        var tumblr_windows = window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
        if(tumblr_windows.focus){
            tumblr_windows.focus();
        }
        else{
            return false;
        }
    }
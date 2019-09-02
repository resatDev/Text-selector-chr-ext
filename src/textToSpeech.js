/**
 * 
 * @param {string} selected_text 
 */
export const speakText = (selected_text) => {
    try {
        var speech = new SpeechSynthesisUtterance(selected_text);
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech)
    }
    catch {
        alert('This browser does not support this features')
    }
}
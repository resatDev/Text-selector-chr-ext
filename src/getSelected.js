/**
 * @return {string}
 */
export const getSelected = () => {
    if(window.getSelection) { return window.getSelection().toString(); }
    else if(document.getSelection) { return document.getSelection().toString(); }
    else {
        var selection = document.selection && document.selection.createRange();
        if(selection.text) { return selection.text.toString(); }
        return false;
    }
 }

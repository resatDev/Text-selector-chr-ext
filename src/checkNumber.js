 /**
  * 
  * @param {string} selectedText 
  */

export const isNumber = (selectedText) => {
    return selectedText.split(' ').filter(function(item){
        return isNaN(item) != true 
    })
}
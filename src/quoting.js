/**
 * Check 
 * @param {selectedText} string
 * is quote or not
 * @return array
 */
export const isQuote = (selectedText) => {
    const slicing = selectedText.split(':')
    return [slicing[0], slicing[1]]
}
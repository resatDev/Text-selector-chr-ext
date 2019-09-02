/**
 * 
 * @param {string} s
 * @return {array} 
 */
   export const parseCalculationString = (s) => {
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
}

/**
 * 
 * @param {array} calc 
 * @return {number}
 */
export const calculate = (calc) => {
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
}


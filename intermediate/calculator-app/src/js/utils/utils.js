import { HIDDEN } from "../constants/css-classes.js";

export function isPointAllowed({currentString, arrNonNumber}) {
    for (let i = currentString.length - 1; i >= 0; i--) {
        const char = currentString[i];
        if (char === '.') {
            return false
        }

        if (arrNonNumber.includes(char)) {
            return true
        }

        if (i === 0) {
            return true
        }
    }
}

export function verificationCalculationCorrectness({str, arrNonNumber}) {
    const operators = arrNonNumber.filter(item => item !== '.');
    
    for (let i = str.length - 1; i >= 0; i--) {
        const element = str[i];

        if (i === str.length - 1 && arrNonNumber.includes(element)) {
            return false
        }

        if (operators.includes(element)) {
            return true;
        }
    }
    return false;
}

export function calculatedResult(resultCalculated) {
    let count = 0;
    let splitResultCalculated = resultCalculated.split(' ')
    let error = false;
    while(splitResultCalculated.length > 1) {
        let prioritetOperand = false;
        if (splitResultCalculated.includes('/') || splitResultCalculated.includes('x')) {
            prioritetOperand = true;
        }

        for (let i = 0; i < splitResultCalculated.length; i++) {
            const element = splitResultCalculated[i];

            if (prioritetOperand && (element === 'x' || element === '/')) {
                if (element === '/' && +splitResultCalculated[i + 1] === 0) {
                    error = true;
                        break
                }
                resultCalculated = replaceSubExpression(
                    {
                        operator: element,
                        num1: +splitResultCalculated[i - 1],
                        num2: +splitResultCalculated[i + 1],
                        resultCalculated: resultCalculated
                    }
                )
                break
            }

            if (!prioritetOperand && (element === '+' || element === '-')) {
                resultCalculated = replaceSubExpression(
                    {
                        operator: element,
                        num1: +splitResultCalculated[i - 1],
                        num2: +splitResultCalculated[i + 1],
                        resultCalculated: resultCalculated
                    }
                )
                break
            }

        }
        splitResultCalculated = resultCalculated.split(' ')
        
        if (error) {
            splitResultCalculated = ['Error']
            break
        }

        count++;
        if (count === 100) {
            break
        }
    }

    return splitResultCalculated[0];
}

export function replaceSubExpression({operator, num1, num2, resultCalculated}) {
    const operations = {
        '+': (a, b) => +parseFloat((a + b).toPrecision(12)),
        '-': (a, b) => +parseFloat((a - b).toPrecision(12)),
        'x': (a, b) => +parseFloat((a * b).toPrecision(12)),
        '/': (a, b) => +parseFloat((a / b).toPrecision(12))
    };
    let resultSubExpression = operations[operator](num1, num2);
    return resultCalculated.replace(`${num1} ${operator} ${num2}`, `${resultSubExpression}`)
}

export function normalizeSpaces(str) {
    let tokens = [];

    for (const element of normalazedExponential(str).split(' ')) {

        if (Number.isNaN(+element)) {
            tokens.push(element)
        } else {
            tokens.push(+element)
        }
    }

    return tokens.join(' ');
}

export function addCommaInResult(str) {
    if (str === 'Error') {
        return str
    }
    
    let isNegativeNumber = false;
    if (str[0] === '-') {
        isNegativeNumber = true;
    }

    let result = [];
    let strWithoutPointerPart = str.split('.');
    let strLeftOfPoint = strWithoutPointerPart[0];
    
    if (isNegativeNumber) {
        strLeftOfPoint = strWithoutPointerPart[0].slice(1);
    }

    let count = 0;
    for (let i = strLeftOfPoint.length - 1; i >= 0; i--) {
        const element = strLeftOfPoint[i];

        if (strLeftOfPoint[i + 1] === 'e' || element === 'e') {
            result.push(element);
            count++;
            continue
        }

        if (count === 3) {
            result.push(',')
            count = 0;
        }
        
        result.push(element);
        count++;
    }

    let formattedLeft = result.reverse().join('');

    if (isNegativeNumber) {
        formattedLeft = '-' + formattedLeft;
    }

    if (strWithoutPointerPart[1] === undefined) {
        return formattedLeft;
    }

    return `${formattedLeft}.${strWithoutPointerPart[1]}`;
}

export function addCommaInScreenView(str) {
    let tokens = normalazedExponential(str).split(' ');
    let result = [];
    for (let i = 0; i < tokens.length; i++) {
        const element = tokens[i];
        if (element.length > 1) {
            if (element[0] === '-') {
                result.push(`-${addCommaInResult(element.slice(1))}`)
            } else {
                result.push(`${addCommaInResult(element)}`)
            }
            continue
        }
        result.push(element)
    }
    return result.join(' ');
}

function normalazedExponential(str) {
    let strWithoutSpace = str.replace(/\s+/g, ' ').trim().split(' ');
    let result = []

    for (let i = 0; i < strWithoutSpace.length; i++) {
        const element = strWithoutSpace[i];
        if (strWithoutSpace[i + 1] === 'e') {
            result.push(`${element}${strWithoutSpace[i + 1]}${strWithoutSpace[i + 2]}${strWithoutSpace[i + 3]}`)
            continue
        }

        if (element === 'e' || strWithoutSpace[i - 1] === 'e' || strWithoutSpace[i - 2] === 'e') {
            continue
        }
        result.push(element)
    }

    return result.join(' ')
}

export function deleteExponential(str) {
    if (!str.includes('e')) {
        return true
    }
    
    const mathOperation = ['-', '+', 'x', '/']

    str = str.replace('e-', 'e').replace('e+', 'e');
    for (const element of str) {
        if (mathOperation.includes(element)) {
            return true;
        }
    }

    return false
}

export function viewLoadingData({skeleton, visibleContent}) {
    skeleton.classList.add(HIDDEN)

    for (const element of visibleContent) {
        element.classList.remove(HIDDEN)
    }
}
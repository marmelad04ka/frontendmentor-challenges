import { buttonContainerDom, screenValueContainer } from "../constants/dom-elements.js";
import { setScreenValue, screenValue} from "../../config/init-state.js";
import { isPointAllowed, verificationCalculationCorrectness, calculatedResult, normalizeSpaces, addCommaInResult, addCommaInScreenView, deleteExponential} from "../utils/utils.js";

export function initButtons() {
    initCalculatorButtons();
}

function initCalculatorButtons() {
    buttonContainerDom.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return; 

        let buttonValue = button.dataset.buttonValue
        
        const arrNonNumber = ['.', 'x', '/', '-', '+', '='];
        const arrNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const operatorsWithoutPointer = arrNonNumber.filter(item => item !== '.');

        if (buttonValue === 'RESET') {
            handleReset();
            return;
        }

        if (!deleteExponential(screenValue) && arrNumber.includes(buttonValue)) {
            handleReset();
            setScreenValue( { addValue: buttonValue} )
            screenValueContainer.textContent = buttonValue;
            return;
        }
        
        if (buttonValue === '=') {
            const checkScreenValue = verificationCalculationCorrectness( { str:screenValue, arrNonNumber : arrNonNumber } );
            if (!checkScreenValue) {
                return
            }
        }
        
        let result = '';

        if (buttonValue === 'DEL') {
            handleDelete(screenValue);
        } else {
            setScreenValue( { addValue: buttonValue} ) 
        }

        for (let i = 0; i < screenValue.length; i++) {
            const element = screenValue[i];
            if (element === '=' || element === 'DEL') {break};

            const leadingDotResult = handleLeadingDot(i, element, screenValue, result);
            if (leadingDotResult !== null) {
                result = leadingDotResult;
                continue;
            }

            if (
                i === 1 && arrNonNumber.filter(item => item !== '-').includes(screenValue[0]) || 
                i === 1 && screenValue[0] === '0' && arrNumber.includes(screenValue[1])
            ) {
                setScreenValue({setValue: screenValue.slice(1)})
                result = screenValue
                break;
            }

            const negativeNumberResult = handleNegativeNumber(i, element, screenValue, result, arrNumber);
            if (negativeNumberResult !== null) {
                result = negativeNumberResult;
                continue;
            }

            const dotRemovalResult = handleDotRemoval(i, element, screenValue, result, operatorsWithoutPointer);
            if (dotRemovalResult !== null) {
                result = dotRemovalResult;
                continue;
            }

            if (arrNonNumber.includes(element) && arrNonNumber.includes(screenValue[i - 1])) {

                const dotAfterOperatorResult = handleDotAfterOperator(element, screenValue, result);
                if (dotAfterOperatorResult !== null) {
                    result = dotAfterOperatorResult;
                    continue;
                }

                const consecutiveOperatorsResult = handleConsecutiveOperators(i, element, screenValue, result, arrNonNumber);
                if (consecutiveOperatorsResult !== null) {
                    result = consecutiveOperatorsResult;
                    continue;
                }

                const doubleMinusResult = handleDoubleMinus(i, element, screenValue, result, arrNonNumber);
                if (doubleMinusResult !== null) {
                    result = doubleMinusResult;
                    continue;
                }

                result = result + element;
                continue;
            }

            const leadingZeroResult = handleLeadingZero(i, element, screenValue, result, arrNonNumber, arrNumber);
            if (leadingZeroResult !== null) {
                result = leadingZeroResult;
                continue;
            }

            if (element === '.' && i === screenValue.length - 1) {
                if (!isPointAllowed({currentString: screenValue.slice(0, -1), arrNonNumber: arrNonNumber})) {
                    setScreenValue({setValue: screenValue.slice(0, -1)})
                    break;
                }
            }

            result = appendElementToResult(element, result, arrNumber);
        }

        if (buttonValue === '=') {
            handleEquals(result);
            return;
        }
        screenValueContainer.textContent = addCommaInScreenView(result);
        
        screenValueContainer.scrollLeft = screenValueContainer.scrollWidth;
    })
}

function handleReset() {
    setScreenValue({ reset: true });
    screenValueContainer.textContent = '';
}

function handleDelete(screenValue) {
    if (screenValue.length === 1) {
        handleReset();
    } else {
        if (!deleteExponential(screenValue)) {
            handleReset();
            return
        }
        setScreenValue({ setValue: screenValue.slice(0, -1) });
    }
}

function handleLeadingDot(i, element, screenValue, result) {
    if (i !== 0 || element !== '.') return null;

    setScreenValue({ setValue: screenValue.slice(0, -1) });
    setScreenValue({ addValue: '0.' });
    return result + '0.';
}

function handleNegativeNumber(i, element, screenValue, result, arrNumber) {
    const isNegativeNumber =
        arrNumber.includes(screenValue[i]) &&
        screenValue[i - 1] === '-' &&
        (screenValue[i - 2] === '-' || i === 1);

    if (!isNegativeNumber) return null;

    return result.trim() + element;
}

function handleDotRemoval(i, element, screenValue, result, operatorsWithoutPointer) {
    if (screenValue[i - 1] !== '.') return null;

    if (element === '.') {
        setScreenValue({ setValue: screenValue.slice(0, -1) });
        return result.slice(0, -1) + element;
    }

    if (operatorsWithoutPointer.includes(element)) {
        setScreenValue({ setValue: screenValue.slice(0, -2) });
        setScreenValue({ addValue: element });
        return result.slice(0, -1) + ' ' + element;
    }

    return null;
}

function handleDotAfterOperator(element, screenValue, result) {
    if (element !== '.' || screenValue[screenValue.length - 2] === '.') return null;

    setScreenValue({ setValue: screenValue.slice(0, -1) });
    setScreenValue({ addValue: '0.' });
    return result + '0';
}

function handleConsecutiveOperators(i, element, screenValue, result, arrNonNumber) {
    const operatorWithoutDot = arrNonNumber.filter(item => item !== '.');

    if (element === '-' || !operatorWithoutDot.includes(screenValue[i - 1])) return null;

    if (operatorWithoutDot.includes(screenValue[i - 2])) {
        setScreenValue({ setValue: screenValue.slice(0, -2) });
        return result.slice(0, -1);
    }

    setScreenValue({ setValue: screenValue.slice(0, -1) });
    setScreenValue({ replaceValue: element });
    return result.slice(0, -2) + element;
}

function handleDoubleMinus(i, element, screenValue, result, arrNonNumber) {
    if (screenValue[i - 1] !== '-') return null;

    if (arrNonNumber.includes(screenValue[i - 2])) {
        setScreenValue({ setValue: screenValue.slice(0, -2) });
        return result.slice(0, -1);
    }

    return result + element;
}

function handleLeadingZero(i, element, screenValue, result, arrNonNumber, arrNumber) {
    const operatorWithoutDot = arrNonNumber.filter(item => item !== '.');

    const isLeadingZero =
        screenValue[i - 1] === '0' &&
        operatorWithoutDot.includes(screenValue[i - 2]) &&
        arrNumber.includes(element);

    if (!isLeadingZero) return null;

    setScreenValue({ setValue: screenValue.slice(0, -1) });
    setScreenValue({ replaceValue: element });
    return result.slice(0, -1) + element;
}

function appendElementToResult(element, result, arrNumber) {
    if (arrNumber.includes(element) || element === '.') {
        return result + element;
    }
    return result + ' ' + element + ' ';
}

function handleEquals(result) {
    let resultCalculated = calculatedResult(normalizeSpaces(result));
    screenValueContainer.textContent = addCommaInResult(resultCalculated);

    if (resultCalculated === 'Error') {
        setScreenValue({ reset: true });
    } else {
        setScreenValue({ setValue: resultCalculated });
    }
}
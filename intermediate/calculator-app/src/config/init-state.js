export const calculatorButtons = ['7', '8', '9', 'DEL', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', 'x', 'RESET', '=']

export let screenValue = '';

export function setScreenValue({addValue, reset, setValue, replaceValue}) {
    if (reset) {
        screenValue = ''
        return
    }

    if (addValue) {
        screenValue += addValue;
    }

    if (setValue) {
        screenValue = setValue;
    }

    if (replaceValue) {
        screenValue = screenValue.slice(0, -1) + replaceValue
    }
}
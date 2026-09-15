import { setScreenValue, screenValue } from "../../config/init-state.js";
import { screenValueContainer } from "../constants/dom-elements.js";

const testCase = {
    'addition': {
        'add two positives': {
            name: 'addition of two positive numbers',
            case: '2+3',
            result: '5'
        },
        'add positive and zero': {
            name: 'addition of positive number and zero',
            case: '5+0',
            result: '5'
        },
        'add zero and positive': {
            name: 'addition of zero and positive number',
            case: '0+5',
            result: '5'
        },
        'add two zeros': {
            name: 'addition of two zeros',
            case: '0+0',
            result: '0'
        },
        'add positive and negative': {
            name: 'addition of positive and negative number',
            case: '5+-3',
            result: '2'
        },
        'add negative and positive': {
            name: 'addition of negative and positive number',
            case: '-5+3',
            result: '-2'
        },
        'add two negatives': {
            name: 'addition of two negative numbers',
            case: '-5+-3',
            result: '-8'
        },
        'add result to zero': {
            name: 'addition giving zero',
            case: '5+-5',
            result: '0'
        },
        'add decimals': {
            name: 'addition of decimals',
            case: '1.5+2.5',
            result: '4'
        },
        'add decimals with rounding': {
            name: 'addition of decimals with floating point',
            case: '0.1+0.2',
            result: '0.3'
        }
    },
    'subtraction': {
        'sub two positives': {
            name: 'subtraction of two positive numbers',
            case: '10-5',
            result: '5'
        },
        'sub result positive': {
            name: 'subtraction with positive result',
            case: '5-10',
            result: '-5'
        },
        'sub positive and zero': {
            name: 'subtraction of positive number and zero',
            case: '5-0',
            result: '5'
        },
        'sub zero and positive': {
            name: 'subtraction of zero and positive number',
            case: '0-5',
            result: '-5'
        },
        'sub two zeros': {
            name: 'subtraction of two zeros',
            case: '0-0',
            result: '0'
        },
        'sub negative': {
            name: 'subtraction of negative number',
            case: '5--3',
            result: '8'
        },
        'sub from negative': {
            name: 'subtraction from negative number',
            case: '-5-3',
            result: '-8'
        },
        'sub two negatives': {
            name: 'subtraction of two negative numbers',
            case: '-5--3',
            result: '-2'
        },
        'sub giving zero': {
            name: 'subtraction giving zero',
            case: '5-5',
            result: '0'
        },
        'sub decimals': {
            name: 'subtraction of decimals',
            case: '5.5-2.5',
            result: '3'
        },
        'sub decimals with floating point': {
            name: 'subtraction of decimals with floating point',
            case: '0.3-0.1',
            result: '0.2'
        }
    },
    'multiplication': {
        'mul two positives': {
            name: 'multiplication of two positive numbers',
            case: '3x4',
            result: '12'
        },
        'mul positive and zero': {
            name: 'multiplication of positive number and zero',
            case: '5x0',
            result: '0'
        },
        'mul zero and positive': {
            name: 'multiplication of zero and positive number',
            case: '0x5',
            result: '0'
        },
        'mul two zeros': {
            name: 'multiplication of two zeros',
            case: '0x0',
            result: '0'
        },
        'mul positive and one': {
            name: 'multiplication of positive number and one',
            case: '7x1',
            result: '7'
        },
        'mul positive and negative': {
            name: 'multiplication of positive and negative number',
            case: '3x-4',
            result: '-12'
        },
        'mul negative and positive': {
            name: 'multiplication of negative and positive number',
            case: '-3x4',
            result: '-12'
        },
        'mul two negatives': {
            name: 'multiplication of two negative numbers',
            case: '-3x-4',
            result: '12'
        },
        'mul decimals': {
            name: 'multiplication of decimals',
            case: '1.5x2',
            result: '3'
        },
        'mul decimals with floating point': {
            name: 'multiplication of decimals with floating point',
            case: '0.1x0.2',
            result: '0.02'
        }
    },
    'division': {
        'div two positives': {
            name: 'division of two positive numbers',
            case: '10/2',
            result: '5'
        },
        'div positive and zero': {
            name: 'division of positive number by zero',
            case: '5/0',
            result: 'Error'
        },
        'div zero and positive': {
            name: 'division of zero by positive number',
            case: '0/5',
            result: '0'
        },
        'div zero by zero': {
            name: 'division of zero by zero',
            case: '0/0',
            result: 'Error'
        },
        'div positive and one': {
            name: 'division of positive number by one',
            case: '7/1',
            result: '7'
        },
        'div positive and negative': {
            name: 'division of positive by negative number',
            case: '10/-2',
            result: '-5'
        },
        'div negative and positive': {
            name: 'division of negative by positive number',
            case: '-10/2',
            result: '-5'
        },
        'div two negatives': {
            name: 'division of two negative numbers',
            case: '-10/-2',
            result: '5'
        },
        'div decimals': {
            name: 'division of decimals',
            case: '3/1.5',
            result: '2'
        },
        'div decimals with floating point': {
            name: 'division of decimals with floating point',
            case: '0.3/0.1',
            result: '3'
        }
    },
    'priority': {
        'mul before add': {
            name: 'multiplication before addition',
            case: '2+3x4',
            result: '14'
        },
        'mul before sub': {
            name: 'multiplication before subtraction',
            case: '10-2x3',
            result: '4'
        },
        'div before add': {
            name: 'division before addition',
            case: '2+8/4',
            result: '4'
        },
        'div before sub': {
            name: 'division before subtraction',
            case: '10-8/4',
            result: '8'
        },
        'add and sub same priority left to right': {
            name: 'addition and subtraction same priority, left to right',
            case: '10-3+2',
            result: '9'
        },
        'mul and div same priority left to right': {
            name: 'multiplication and division same priority, left to right',
            case: '8/4x2',
            result: '4'
        },
        'mul and div chain left to right': {
            name: 'multiplication and division chain, left to right',
            case: '8/4/2',
            result: '1'
        },
        'full expression': {
            name: 'full expression with all operators',
            case: '1+2x3-4/2',
            result: '5'
        },
        'full expression with negatives': {
            name: 'full expression with negative numbers',
            case: '-1+2x-3-4/-2',
            result: '-5'
        }
    },
    'decimals': {
        'decimal plus decimal': {
            name: 'addition of two decimals',
            case: '1.5+2.5',
            result: '4'
        },
        'decimal minus decimal': {
            name: 'subtraction of two decimals',
            case: '5.5-2.5',
            result: '3'
        },
        'decimal mul decimal': {
            name: 'multiplication of two decimals',
            case: '1.5x2',
            result: '3'
        },
        'decimal div decimal': {
            name: 'division of two decimals',
            case: '3/1.5',
            result: '2'
        },
        'decimal plus integer': {
            name: 'addition of decimal and integer',
            case: '1.5+2',
            result: '3.5'
        },
        'integer plus decimal': {
            name: 'addition of integer and decimal',
            case: '2+1.5',
            result: '3.5'
        },
        'decimal with leading zero': {
            name: 'decimal with leading zero',
            case: '0.5+0.5',
            result: '1'
        },
        'decimal with floating point add': {
            name: 'floating point addition',
            case: '0.1+0.2',
            result: '0.3'
        },
        'decimal with floating point sub': {
            name: 'floating point subtraction',
            case: '0.3-0.1',
            result: '0.2'
        },
        'decimal with floating point mul': {
            name: 'floating point multiplication',
            case: '0.1x0.2',
            result: '0.02'
        },
        'decimal with floating point div': {
            name: 'floating point division',
            case: '0.3/0.1',
            result: '3'
        },
        'long decimal result': {
            name: 'long decimal result (1/3)',
            case: '1/3',
            result: '0.333333333333'
        }
    },
    'leading zero': {
        'zero then digit': {
            name: 'zero followed by digit becomes digit',
            case: '05',
            result: '5'
        },
        'zero then zero': {
            name: 'zero followed by zero stays zero',
            case: '00',
            result: '0'
        },
        'zero then decimal': {
            name: 'zero followed by decimal point',
            case: '0.5',
            result: '0.5'
        },
        'zero after operator': {
            name: 'zero after operator followed by digit',
            case: '1+05',
            result: '6'
        },
        'zero after operator then decimal': {
            name: 'zero after operator followed by decimal',
            case: '1+0.5',
            result: '1.5'
        },
        'zero after operator then zero': {
            name: 'zero after operator followed by zero',
            case: '1+00',
            result: '1'
        },
        'multiple zeros after operator': {
            name: 'multiple zeros after operator',
            case: '1+0005',
            result: '6'
        },
        'zero in middle of number': {
            name: 'zero in middle of number',
            case: '105',
            result: '105'
        },
        'zero at end of number': {
            name: 'zero at end of number',
            case: '150',
            result: '150'
        },
        'zero before decimal in number': {
            name: 'zero before decimal in number',
            case: '1+1.05',
            result: '2.05'
        }
    },
    'negative numbers': {
        'negative plus positive': {
            name: 'negative plus positive',
            case: '-5+3',
            result: '-2'
        },
        'positive plus negative': {
            name: 'positive plus negative',
            case: '5+-3',
            result: '2'
        },
        'negative minus positive': {
            name: 'negative minus positive',
            case: '-5-3',
            result: '-8'
        },
        'positive minus negative': {
            name: 'positive minus negative',
            case: '5--3',
            result: '8'
        },
        'negative mul positive': {
            name: 'negative multiplied by positive',
            case: '-5x3',
            result: '-15'
        },
        'positive mul negative': {
            name: 'positive multiplied by negative',
            case: '5x-3',
            result: '-15'
        },
        'negative mul negative': {
            name: 'negative multiplied by negative',
            case: '-5x-3',
            result: '15'
        },
        'negative div positive': {
            name: 'negative divided by positive',
            case: '-10/2',
            result: '-5'
        },
        'positive div negative': {
            name: 'positive divided by negative',
            case: '10/-2',
            result: '-5'
        },
        'negative div negative': {
            name: 'negative divided by negative',
            case: '-10/-2',
            result: '5'
        },
        'negative plus negative': {
            name: 'negative plus negative',
            case: '-5+-3',
            result: '-8'
        },
        'negative minus negative': {
            name: 'negative minus negative',
            case: '-5--3',
            result: '-2'
        }
    },
    'invalid input': {
        'equals on empty': {
            name: 'equals on empty screen',
            case: '',
            result: ''
        },
        'equals after operator': {
            name: 'equals after operator',
            case: '1+',
            result: '1+'
        },
        'equals after two operators': {
            name: 'equals after two operators',
            case: '1+2+',
            result: '1+2+'
        },
        'equals after plus minus': {
            name: 'equals after plus and minus',
            case: '1+-',
            result: '1+-'
        },
        'equals after dot': {
            name: 'equals after decimal point',
            case: '1.',
            result: '1.'
        },
        'equals after operator and dot': {
            name: 'equals after operator and decimal point',
            case: '1+.',
            result: '1+0.'
        },
        'equals with only operator': {
            name: 'equals with only operator',
            case: '+',
            result: '+'
        },
        'equals with only minus': {
            name: 'equals with only minus',
            case: '-',
            result: '-'
        },
        'equals with only dot': {
            name: 'equals with only decimal point',
            case: '.',
            result: '0.'
        }
    },
    'comma formatting': {
        'thousand': {
            name: 'thousand',
            case: '1000',
            result: '1,000'
        },
        'ten thousand': {
            name: 'ten thousand',
            case: '10000',
            result: '10,000'
        },
        'hundred thousand': {
            name: 'hundred thousand',
            case: '100000',
            result: '100,000'
        },
        'million': {
            name: 'million',
            case: '1000000',
            result: '1,000,000'
        },
        'billion': {
            name: 'billion',
            case: '1000000000',
            result: '1,000,000,000'
        },
        'negative thousand': {
            name: 'negative thousand',
            case: '-1000',
            result: '-1,000'
        },
        'negative million': {
            name: 'negative million',
            case: '-1000000',
            result: '-1,000,000'
        },
        'decimal with thousand': {
            name: 'decimal with thousand',
            case: '1234.5678',
            result: '1,234.5678'
        },
        'three digits no comma': {
            name: 'three digits without comma',
            case: '123',
            result: '123'
        },
        'four digits with comma': {
            name: 'four digits with comma',
            case: '1234',
            result: '1,234'
        },
        'calculation giving comma result': {
            name: 'calculation giving comma result',
            case: '999+1',
            result: '1,000'
        },
        'calculation with comma in operands': {
            name: 'calculation with comma in operands',
            case: '1000+1000',
            result: '2,000'
        },
        'million plus million': {
            name: 'million plus million',
            case: '1000000+1000000',
            result: '2,000,000'
        }
    },
    'exponential': {
        'very small division': {
            name: 'very small division result',
            case: '3/70000000',
            result: '4.28571428571e-8'
        },
        'very small division by ten million': {
            name: 'division by ten million',
            case: '1/10000000',
            result: '1e-7'
        },
        'very big multiplication': {
            name: 'very big multiplication result',
            case: '1000000000000000000000x1000000000000000000000',
            result: '1e+42'
        },
        'big number multiplication': {
            name: 'multiplication of large numbers',
            case: '99999999999999999999x99999999999999999999',
            result: '1e+40'
        },
        'small number division': {
            name: 'small number after division',
            case: '5/1000000000000',
            result: '5e-12'
        },
        'normal number stays normal': {
            name: 'normal number is not exponential',
            case: '100/2',
            result: '50'
        },
        'continue after exponential': {
            name: 'continue after exponential result',
            case: '3/70000000x2',
            result: '8.57142857142e-8'
        },
        'continue with addition': {
            name: 'continue with addition after exponential',
            case: '3/70000000x2x2',
            result: '1.71428571428e-7'
        },
        'negative operand with exponential': {
            name: 'negative operand with exponential result',
            case: '-3/70000000x2',
            result: '-8.57142857142e-8'
        },
        'add number to exponential': {
            name: 'add number to exponential result',
            case: '1+3/70000000',
            result: '1.00000004286'
        },
        'subtract exponential from number': {
            name: 'subtract exponential from number',
            case: '1-3/70000000',
            result: '0.999999957143'
        },
        'multiply exponential by big number': {
            name: 'multiply exponential by big number',
            case: '3/70000000x1000000000',
            result: '42.8571428571'
        },
        'divide exponential by big number': {
            name: 'divide exponential by big number',
            case: '3/70000000/1000000000',
            result: '4.28571428571e-17'
        },
        'negative exponential result': {
            name: 'negative exponential result',
            case: '-3/70000000',
            result: '-4.28571428571e-8'
        },
        'exponential in both operands': {
            name: 'exponential in both operands',
            case: '3/70000000+3/70000000',
            result: '8.57142857142e-8'
        },
        'positive exponent continuation': {
            name: 'positive exponent continuation',
            case: '1000000000000000000000x1000000000000000000000/1000000000000000000000',
            result: '1e+21'
        }
    },
    'editing': {
        'delete last digit': {
            name: 'delete last digit',
            case: '123DEL',
            result: '12'
        },
        'delete operator': {
            name: 'delete operator',
            case: '5+DEL',
            result: '5'
        },
        'delete digit after operator': {
            name: 'delete digit after operator',
            case: '5+8DEL',
            result: '5+'
        },
        'delete to empty': {
            name: 'delete to empty',
            case: '1DEL',
            result: ''
        },
        'delete multiple times': {
            name: 'delete multiple times',
            case: '123DELDELDEL',
            result: ''
        },
        'delete after decimal point': {
            name: 'delete after decimal point',
            case: '1.5DEL',
            result: '1.'
        },
        'delete decimal point': {
            name: 'delete decimal point',
            case: '1.5DELDEL',
            result: '1'
        },
        'delete leading zero': {
            name: 'delete leading zero',
            case: '0.5DEL',
            result: '0.'
        },
        'reset after input': {
            name: 'reset after input',
            case: '5+8RESET',
            result: ''
        },
        'reset on empty': {
            name: 'reset on empty',
            case: 'RESET',
            result: ''
        },
        'reset then input': {
            name: 'reset then input',
            case: '5+8RESET3',
            result: '3'
        }
    }
}

export function autoTest() {
    const buttonEqual = document.querySelector('[data-button-value="="]');
    Object.entries(testCase).forEach(([groupName, group]) => {
        console.log(`--- ${groupName} ---`)
        Object.values(group).forEach(element => {

            setScreenValue({ reset: true })
            typeExpression(element.case);

            if (groupName !== 'editing') {
                buttonEqual.click();
            }

            let actual;
            if (element.result === 'Error') {
                actual = screenValueContainer.textContent;
            } else if (groupName === 'comma formatting') {
                actual = screenValueContainer.textContent;
            } else if (groupName === 'exponential') {
                actual = screenValueContainer.textContent; 
            } else {
                actual = screenValue;
            }

            if (actual === element.result) {
                console.log(`${element.name}: ✅Passed`)
            } else {
                console.log(`${element.name}: ❌Failed`)
                console.log(`Case: ${element.case} , Expected result: ${element.result} , Actual result: ${actual}`)
            }
        })
        console.log('------------------------')
    })
    setScreenValue({reset: true})
}

function typeExpression(expression) {
    const tokens = expression.match(/DEL|RESET|./g) || [];
    for (const token of tokens) {
        const button = document.querySelector(`[data-button-value="${token}"]`);
        if (button) button.click();
    }
}

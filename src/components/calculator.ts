import { Operation } from '../models/operation.model.js'

class Calculator {
    memory: Operation

    constructor() {
        this.memory = {
            currentValue: 0,
            previousValue: 0,
            operator: ''
        }
    }

    execute(operation: Operation): string {
        let result = ''
        if(operation.operator === 'sum') {
            operation.currentValue = operation.previousValue + operation.currentValue
            operation.operator = '+'
        } else if(operation.operator === 'sub') {
            operation.currentValue = operation.previousValue - operation.currentValue
            operation.operator = '-'
        } else if(operation.operator === 'mul') {
            operation.currentValue = operation.previousValue * operation.currentValue
            operation.operator = 'x'
        } else if(operation.operator === 'div') {
            operation.currentValue = operation.previousValue / operation.currentValue
            operation.operator = '/'
        } else if (operation.operator === 'result') {
            operation.operator = '='
        }
        return result = operation.currentValue.toString()
    }
}

export const calculator = new Calculator()
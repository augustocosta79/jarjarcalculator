import { Operation } from '../models/operation.model.js'
import { DisplayType } from '../models/display.model.js'
import { calculator } from './calculator.js'


class Display {
    input: HTMLInputElement
    type: DisplayType
    clearButton: HTMLButtonElement
    delButton: HTMLButtonElement
    helper: HTMLSpanElement
    
    constructor(){
        this.type = DisplayType.input
        this.input = document.getElementById('data')! as HTMLInputElement
        this.input.title = this.type
        this.clearButton = document.getElementById('clear')! as HTMLButtonElement
        this.delButton = document.getElementById('del')! as HTMLButtonElement
        this.helper = document.getElementById('helper')! as HTMLSpanElement

        this.configure()
    }

    configure() {
        this.clearButton.addEventListener('click', this.clearMemory.bind(this))
        this.delButton.addEventListener('click', this.delNumber.bind(this))
    }

    showHelper(item: Operation, result: boolean): void {
        let operatorSymbol
        switch (item.operator) {
            case 'sum':
                operatorSymbol = '+'
                break;
            case 'sub':
                operatorSymbol = '-'
                break;
            case 'mul':
                operatorSymbol = 'x'
                break;
            case 'div':
                operatorSymbol = '/'
                break;
            case 'result':
                operatorSymbol = ''
                break;
            
            default:
                break;
        }

        if(result){
            this.helper.innerHTML = item.previousValue + ' ' + operatorSymbol + ' ' + item.currentValue + ' ='
        } else {
            this.helper.innerHTML = item.previousValue + ' ' + operatorSymbol
        }
    }

    hideHelper(): void {
        this.helper.innerHTML = ''
    }

    setType(displayType: DisplayType): void {
        if(displayType === DisplayType.input) {
            this.type = DisplayType.input
            this.input.title = DisplayType.input
        }

        if(displayType === DisplayType.result) {
            this.type = DisplayType.result
            this.input.title = DisplayType.result
        }
    }

    currentValue(): number {
        return +this.input.value
    }
    
    clear(): void {
        this.input.value = ''
    }

    clearMemory(): void {
        this.clear()
        this.hideHelper()
        calculator.memory = {
            currentValue: 0,
            previousValue: 0,
            operator: ''
        }
    }
    
    enterResult(result: string): void {
        this.input.value = result        
    }
    
    enterNumber(number: string): void {
        this.input.value += number        
    }

    delNumber(): void {
        if(display.type === DisplayType.input) {
            this.input.value = this.input.value.slice(0,-1)
        }
    }

    addOperation (operation: Operation){
        calculator.memory = operation
    }
}

export const display = new Display()
import { ConfigureButton } from '../components/base-component.js'
import { display } from '../components/display.js'
import { DisplayType } from '../models/display.model.js'
import { Operation } from '../models/operation.model.js';

export class OperationButton extends ConfigureButton {
    constructor(){
        super('#operations :not(button[id="clear"])')
    }
    
    configure(button: HTMLButtonElement){
        button.addEventListener('click', () => {
            this.createOperation(button)
        })
    }
    
    createOperation(button: HTMLButtonElement){
        console.log(display.memory)
        let result: string = ''
        if(display.memory.length === 0) {
            display.addOperation(new Operation(display.currentValue(), button.title))
            result = display.memory[0].value.toString()
            console.log(display.memory)
        } else {
            display.memory.forEach((item: Operation, index: number, calcs: Operation[]) => {
                if(item.operator === 'sum') {
                    item.value += display.currentValue()
                    item.operator = button.title
                } else if(item.operator === 'sub') {
                    item.value = item.value - display.currentValue()
                    item.operator = button.title
                } else if(item.operator === 'mul') {
                    item.value *= display.currentValue()
                    item.operator = button.title
                } else if(item.operator === 'div') {
                    item.value /= display.currentValue()
                    item.operator = button.title
                } else if (item.operator === 'result') {
                    item.operator = button.title
                }
                result = item.value.toString()
            })
            
        }

        display.showHelper(display.memory[0])
        display.clear()
        display.setType(DisplayType.result)
        display.enterResult(result)

    }
    
}
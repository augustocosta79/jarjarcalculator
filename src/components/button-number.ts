import { ConfigureButton } from '../components/base-component.js'
import { display } from '../components/display.js'
import { DisplayType } from '../models/display.model.js'

export class NumberButton extends ConfigureButton {
    constructor(){
        super('#numbers :not(button[id="del"])')
    }

    configure (button: HTMLButtonElement): void {
        button.addEventListener('click', () => {
            this.typeNumber(button)
        })
    }

    typeNumber(button: HTMLButtonElement): void {
        if(display.type === DisplayType.result) {
            display.setType(DisplayType.input)
            display.clear()
        }
        display.enterNumber(button.innerHTML)
    }
}

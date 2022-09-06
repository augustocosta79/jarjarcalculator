import { ConfigureButton } from '../components/base-component.js'
import { display } from '../components/display.js'
import { calculator } from './calculator.js'
import { DisplayType } from '../models/display.model.js'
import { Operation } from '../models/operation.model.js';

export class OperationButton extends ConfigureButton {
    constructor(){
        super('#operations :not(button[id="clear"])')
    }
    
    configure(button: HTMLButtonElement){
        button.addEventListener('click', () => {
            this.chooseOperation(button)
        })
    }

    chooseOperation(button: HTMLButtonElement) {
        if(!display.currentValue() && !display.helper.innerHTML) return

        if (
          display.currentValue() &&
          !display.helper.innerHTML &&
          button.title !== "result"
        ) {
          calculator.memory.previousValue = display.currentValue();
          calculator.memory.operator = button.title;
          display.showHelper(calculator.memory, false);
          display.clear();
        }

        if (
          !display.currentValue() &&
          display.helper.innerHTML &&
          button.title !== "result"
        ) {
          calculator.memory.operator = button.title;
          display.showHelper(calculator.memory, false);
        }

        if (
          display.currentValue() &&
          display.helper.innerHTML &&
          display.type === DisplayType.input
        ) {
          calculator.memory.currentValue = display.currentValue();
          const result = calculator.execute(
            new Operation(
              calculator.memory.currentValue,
              calculator.memory.previousValue,
              calculator.memory.operator
            )
          );

          display.enterResult(result);
          display.setType(DisplayType.result);
          if (button.title === "result") {
            display.showHelper(calculator.memory, true);
          } else {
            calculator.memory.previousValue = +result;
            calculator.memory.operator = button.title;
            display.showHelper(calculator.memory, false);
            display.clear();
          }

          return;
        }

        if (
          display.currentValue() &&
          display.helper.innerHTML &&
          display.type === DisplayType.result &&
          button.title !== "result"
        ) {
          calculator.memory.previousValue = display.currentValue();
          calculator.memory.operator = button.title;
          display.showHelper(calculator.memory, false);
          display.clear();
        }
        

    }

}
export abstract class ConfigureButton {
    protected elements: HTMLButtonElement []
    
    constructor(selector: string){
        this.elements = [...document.querySelectorAll(`${selector}`) as NodeListOf<HTMLButtonElement>]
        
        for(const button of this.elements) {
            this.configure(button)
        }
    }

    abstract configure (button: HTMLButtonElement): void

}
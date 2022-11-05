import BlotFormatter from "../../BlotFormatter";
import { Aligner } from "./Aligner";
import { Alignment } from "./Alignment";

export default class DefaultToolbar {
    toolbar: HTMLElement | null;
    buttons: HTMLElement[];

    constructor() {
        this.toolbar = null
        this.buttons = []
    }

    create(formatter: BlotFormatter, aligner: Aligner) {
        const toolbar = document.createElement('div');
        toolbar.classList.add(formatter.options.align.toolbar.mainClassName)
        this.addToolbarStyle(formatter, toolbar)
    }

    addToolbarStyle(formatter: BlotFormatter, toolbar: HTMLElement) {
        if (formatter.options.align.toolbar.mainStyle) {
            Object.assign(toolbar.style, formatter.options.align.toolbar.mainStyle)
        }
    }

    addButtons(formatter: BlotFormatter, toolbar: HTMLElement, aligner: Aligner) {
        aligner.getAlignments().forEach((alignment, i) => {
            const button = document.createElement('span')
            button.classList.add(formatter.options.align.toolbar.buttonClassName)
            button.innerHTML = alignment.icon
            button.addEventListener('click', () => {
                this.onButtonClick(button, formatter, alignment, aligner)
            })

            
        })
    }

    onButtonClick(button: HTMLElement, formatter: BlotFormatter, alignment: Alignment, aligner: Aligner) {
        if (!formatter.currentSpec) {
            return;
        }

        const target = formatter.currentSpec.getTargetElement()
        if (!target){
            return 
        }

        this.clickButton(button, target, formatter, alignment, aligner)
    }

    deselectButtton(formatter: BlotFormatter, button: HTMLElement) {
        button.classList.remove('is-selected');

        if (formatter.options.align.toolbar.addButtonSelectStyle) {
            button.style.removeProperty('filter')
        }
    }

    clickButton(button: HTMLElement, alignTarget: HTMLElement, formatter: BlotFormatter, alignment: Alignment, aligner: Aligner) {
        this.buttons.forEach((b) => { this.deselectButtton(formatter, b)})
        
        if (aligner.isAligned(alignTarget, alignment)) {
            if (formatter.options.align.toolbar.allowDeselect) {
                aligner.clear(alignTarget)
            } else {
                this.selectButton(formatter, button)
            }
        } else {
            this.selectButton(formatter, button)
            alignment.apply(alignTarget)
        }

        formatter.update()
    }

    selectButton(formatter: BlotFormatter, button: HTMLElement) {
        button.classList.add('is-selected')
        if (formatter.options.align.toolbar.addButtonSelectStyle) {
            button.style.setProperty('filter', 'invert(20%)')
        }
    }

    preselectButton(button: HTMLElement, alignment: Alignment, formatter: BlotFormatter, aligner: Aligner) {
        if (!formatter.currentSpec) {
            return;
        }

        const target = formatter.currentSpec.getTargetElement();
        if (!target) {
            return 
        }

        if (aligner.isAligned(target, alignment)) {
            this.selectButton(formatter, button)
        }
    }
}
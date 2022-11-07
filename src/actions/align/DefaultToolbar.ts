import BlotFormatter from "../../BlotFormatter";
import { Alignment } from "./Alignment";
import { Aligner } from "./Aligner";
import DefaultAligner from "../align/DefaultAligner"

export default class Toolbar {
    toolbar: HTMLDivElement | null;
    buttons: HTMLSpanElement[];

    constructor() {
        this.toolbar = null
        this.buttons = []
    }

    create(formatter: BlotFormatter, aligner: DefaultAligner): Node {
        const toolbar = document.createElement('div');
        toolbar.classList.add(formatter.options.align.toolbar.mainClassName)
        this.addToolbarStyle(formatter, toolbar)
        this.addButtons(formatter, toolbar, aligner)
        return toolbar
    }

    addToolbarStyle(formatter: BlotFormatter, toolbar: HTMLElement) {
        if (formatter.options.align.toolbar.mainStyle) {
            Object.assign(toolbar.style, formatter.options.align.toolbar.mainStyle)
        }
    }

    addButtons(formatter: BlotFormatter, toolbar: HTMLDivElement, aligner: DefaultAligner) {
        aligner.getAlignments().forEach((alignment, i) => {
            const button = document.createElement('span')
            button.classList.add(formatter.options.align.toolbar.buttonClassName)
            button.innerHTML = alignment.icon
            button.addEventListener('click', () => {
                this.onButtonClick(button, formatter, alignment, aligner)
            })

            this.preselectButton(button, alignment, formatter, aligner)
            this.addButtonStyle(button, i, formatter)
            this.buttons.push(button)
            toolbar.appendChild(button)
        })
    }

    addButtonStyle(button: any, index: number, formatter: BlotFormatter) {
        if (formatter.options.align.toolbar.buttonStyle) {
            Object.assign(button.style, formatter.options.align.toolbar.buttonStyle);

            if (index > 0) {
                button.style.borderLeftWidth = '0'
            }
        }

        if (formatter.options.align.toolbar.svgStyle) {
            Object.assign(button.children[0].style, formatter.options.align.toolbar.svgStyle)
        }
    }

    onButtonClick(button: HTMLElement, formatter: BlotFormatter, alignment: Alignment, aligner: DefaultAligner) {
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

    clickButton(button: HTMLElement, alignTarget: HTMLElement, formatter: BlotFormatter, alignment: Alignment, aligner: DefaultAligner) {
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

    selectButton(formatter: BlotFormatter, button: HTMLSpanElement) {
        button.classList.add('is-selected')
        if (formatter.options.align.toolbar.addButtonSelectStyle) {
            button.style.setProperty('filter', 'invert(20%)')
        }
    }

    preselectButton(button: HTMLSpanElement, alignment: Alignment, formatter: BlotFormatter, aligner: Aligner) {
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
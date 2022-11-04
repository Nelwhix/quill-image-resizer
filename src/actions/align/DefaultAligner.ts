import { AlignOptions } from "../../Options";
import { Alignment } from "./Alignment";


const LEFT_ALIGN = "left";
const CENTER_ALIGN = "center";
const RIGHT_ALIGN = "right";

export default class DefaultAligner {
    alignments: Object
    alignAttribute: string;
    applyStyle: boolean;

    constructor(options: AlignOptions) {
        this.applyStyle = options.aligner.applyStyle
        this.alignAttribute = options.attribute;
        this.alignments = {
            LEFT_ALIGN: {
                name: LEFT_ALIGN,
                icon: options.icons.left,
                apply: (el: HTMLElement) => {
                    this.setAlignment(el, LEFT_ALIGN)
                    this.setStyle(el, 'inline', 'left', '0 1em 1em 0')
                }
            }
        }
    }

    setStyle(el: HTMLElement, display?: string, float?: string, margin?: string) {
        if (this.applyStyle) {
            if (display) {
                el.style.setProperty('display', display)
            }
            
            if (float) {
                el.style.setProperty('float', float)
            }
            
            if (margin) {
                el.style.setProperty('margin', margin)
            }
        }
    }

    setAlignment(el: HTMLElement, value: string) {
        el.setAttribute(this.alignAttribute, value)
    }
}
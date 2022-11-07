import { AlignOptions } from "../../Options";
import { Alignment } from "./Alignment";
import { Aligner } from "./Aligner";


const LEFT_ALIGN = "left";
const CENTER_ALIGN = "center";
const RIGHT_ALIGN = "right";

export default class DefaultAligner implements Aligner {
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
            },
            CENTER_ALIGN: {
                name: CENTER_ALIGN,
                icon: options.icons.center,
                apply: (el: HTMLElement) => {
                    this.setAlignment(el, CENTER_ALIGN)
                    this.setStyle(el, 'block', 'none', 'auto')
                }
            },
            RIGHT_ALIGN: {
                name: RIGHT_ALIGN,
                icon: options.icons.right,
                apply: (el: HTMLElement) => {
                    this.setAlignment(el, RIGHT_ALIGN)
                    this.setStyle(el, 'inline', 'right', '0 0 1em 1em')
                }
            }
        }
    }

    getAlignments(): Alignment[] {
        return Object.keys(this.alignments).map(k => this.alignments[k])
    }

    clear(el: HTMLElement) {
        el.removeAttribute(this.alignAttribute)
        this.setStyle(el, '', '', '')
    }

    isAligned(el: HTMLElement, alignment: Alignment): boolean {
        return el.getAttribute(this.alignAttribute) === alignment.name;
    }

    setStyle(el: HTMLElement, display: string, float: string, margin: string) {
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
import Quill from 'quill'
import BlotSpec from './specs/BlotSpec';
import deepmerge from 'deepmerge';
import { Options } from './Options';
const dontMerge = (destination: [], source: []) => source;



export default class BlotFormatter {
    quill: Quill
    options: Options
    currentSpec: BlotSpec
    specs: BlotSpec[]
    overlay: HTMLElement
    actions: Action[];

    constructor(quill: Quill, options = {}) {
        this.quill = quill;
        this.options = deepmerge()
    }

    update() {
        
    }

    repositionOverlay() {
        if (!this.currentSpec) {
            return
        }
        const overlayTarget = this.currentSpec.
    }
    
}
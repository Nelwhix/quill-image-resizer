import Quill from 'quill'
import { deepmerge } from "deepmerge-ts";
import { Options } from './Options';
const dontMerge = (destination: Array<any>, source: Array<any>) => source;



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
    
}
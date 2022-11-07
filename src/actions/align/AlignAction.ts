import BlotFormatter from "../../BlotFormatter";
import Action from "../Action";
import DefaultAligner from "./DefaultAligner";
import { Aligner } from "./Aligner";
import Toolbar from "./DefaultToolbar";
import DefaultToolbar from "./DefaultToolbar";

export default class AlignAction extends Action {
    toolbar: Toolbar;
    aligner: Aligner;

    constructor(formatter: BlotFormatter) {
        super(formatter)
        this.aligner = new DefaultAligner(formatter.options.align)
        this.toolbar = new DefaultToolbar()
    }

    onCreate() {
        const toolbar = this.toolbar.create(this.formatter, this.aligner)
        this.formatter.overlay.appendChild(toolbar);
    }

}
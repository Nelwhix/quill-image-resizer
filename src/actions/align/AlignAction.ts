import BlotFormatter from "../../BlotFormatter";
import Action from "../Action";
import Aligner from "./DefaultAligner";
import Toolbar from "./DefaultToolbar";

export default class AlignAction extends Action {
    toolbar: Toolbar;
    aligner: Aligner;

    constructor(formatter: BlotFormatter) {
        super(formatter)
        this.aligner = new Aligner(formatter.options.align)
        this.toolbar = new Toolbar()
    }

    onCreate() {
        const toolbar = this.toolbar.create(this.formatter, this.aligner)
        this.formatter.overlay.appendChild(toolbar);
    }

}
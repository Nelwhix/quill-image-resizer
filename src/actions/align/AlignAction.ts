import BlotFormatter from "../../BlotFormatter";
import Action from "../Action";
import { Aligner } from "./Aligner";
import DefaultAligner from "./DefaultAligner";
import { Toolbar } from "./Toolbar";

export default class AlignAction extends Action {
    toolbar: Toolbar;
    aligner: DefaultAligner;

    constructor(formatter: BlotFormatter) {
        super(formatter)
        this.aligner = new DefaultAligner(formatter.options.align)
    }
}
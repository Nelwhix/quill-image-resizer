import BlotFormatter from "../../BlotFormatter";
import Action from "../Action";
import { Aligner } from "./Aligner";
import { Toolbar } from "./Toolbar";

export default class AlignAction extends Action {
    toolbar: Toolbar;
    aligner: Aligner;

    constructor(formatter: BlotFormatter) {
        super(formatter)
    
    }
}
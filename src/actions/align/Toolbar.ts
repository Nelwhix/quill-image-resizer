import BlotFormatter from "../../BlotFormatter";
import { Aligner } from "./Aligner";

export type Toolbar =  {
    create(formatter: BlotFormatter, alignmentHelper: Aligner): HTMLElement;
    destroy(): void;
    getElement(): HTMLElement | null
}
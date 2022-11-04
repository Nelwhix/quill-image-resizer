import { Alignment } from "./Alignment";

export type Aligner = {
    getAlignments(): Alignment[]
    isAligned(el: HTMLElement, alignment: Alignment): boolean
    clear(el: HTMLElement): void
}
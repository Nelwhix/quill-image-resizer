import BlotFormatter from "../BlotFormatter";
import AlignAction from '../actions/align/AlignAction';
import ResizeAction from '../actions/ResizeAction';
import DeleteAction from '../actions/DeleteAction';

export default class BlotSpec {
    formatter: BlotFormatter

    constructor(formatter: BlotFormatter) {
        this.formatter = formatter
    }

    init(): void {}

    getActions(): Action {
        return [AlignAction, ResizeAction, DeleteAction];
    }
}
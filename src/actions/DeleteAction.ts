import Quill from "quill";
import Action from "./Action";


export default class DeleteAction extends Action {
    onCreate(): void {
        document.addEventListener('keyup', this.onKeyUp, true)
    }

    onKeyUp = (e: KeyboardEvent) => {
        if (!this.formatter.currentSpec) {
            return
        }

        // delete or backspace
        if (e.keyCode == 46 || e.keyCode === 8) {
            const blot = Quill.find(this.formatter.currentSpec.getTargetElement())
        
            
        }
    }
}
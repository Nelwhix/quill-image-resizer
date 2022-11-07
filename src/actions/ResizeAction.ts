import BlotFormatter from "../BlotFormatter";
import Action from "./Action";

export default class ResizeAction extends Action {
    topLeftHandle: HTMLElement
    topRightHandle: HTMLElement
    bottomRightHandle: HTMLElement
    bottomLeftHandle: HTMLElement
    dragHandle: any
    dragStartX: number
    preDragWidth: number
    targetRatio: number

    constructor(formatter: BlotFormatter) {
        super(formatter)
        this.topLeftHandle = this.createHandle('top-left', 'nwse-resize')
        this.topRightHandle = this.createHandle('top-right', 'nesw-resize')
        this.bottomRightHandle = this.createHandle('bottom-right', 'nwse-resize')
        this.bottomLeftHandle = this.createHandle('bottom-left', 'nesw-resize')

        this.dragHandle = null
        this.dragStartX = 0
        this.preDragWidth = 0
        this.targetRatio = 0
    }

    createHandle(position: string, cursor: string): HTMLElement {
        const box = document.createElement('div')
        box.classList.add(this.formatter.options.resize.handleClassName)
        box.setAttribute('data-position', position)
        box.style.cursor = cursor

        if (this.formatter.options.resize.handleStyle) {
            Object.assign(box.style, this.formatter.options.resize.handleStyle)
        }

        box.addEventListener('mousedown', this.onMouseDown)

        return box;
    }

    onMouseDown = (event: MouseEvent) => {
        if (!event.target) {
            return
        }

        this.dragHandle = event.target

        this.setCursor(this.dragHandle.style.cursor)

        if (!this.formatter.currentSpec) {
            return
        }

        const target = this.formatter.currentSpec.getTargetElement();

        if (!target) {
            return
        }

        const rect = target.getBoundingClientRect()

        this.dragStartX = event.clientX
        this.preDragWidth = rect.width
        this.targetRatio = rect.height / rect.width

        document.addEventListener('mousemove', this.onDrag)
        document.addEventListener('mousemove', this.onMouseUp)
    }

    onDrag = (event: MouseEvent) => {
        if (!this.formatter.currentSpec) {
            return
        }

        const target = this.formatter.currentSpec.getTargetElement()

        if (!target) {
            return;
        }

        const deltaX = event.clientX - this.dragStartX
        let newWidth = 0;

        if (this.dragHandle === this.topLeftHandle || this.dragHandle === this.bottomLeftHandle) {
            newWidth = Math.round(this.preDragWidth - deltaX)
        } else {
            newWidth = Math.round(this.preDragWidth + deltaX)
        }

        const newHeight = this.targetRatio * newWidth;

        target.setAttribute('width', `${newWidth}`)
        target.setAttribute('height', `${newHeight}`)

        this.formatter.update()
    }

    setCursor(value: string) {
        if (document.body) {
            document.body.style.color = value;
        }

        if (this.formatter.currentSpec) {
            const target = this.formatter.currentSpec.getOverlayElement()
            
            if (target) {
                target.style.color = value
            }
        }
    }

    onMouseUp = () => {
        this.setCursor('')
        document.removeEventListener('mousemove', this.onDrag)
        document.removeEventListener('mouseup', this.onMouseUp)
    }
}
import BlotSpec from "./specs/BlotSpec"

export type Options = {
    specs: BlotSpec,
    overlay: OverlayOptions,
    align: AlignOptions,
    resize: ResizeOptions,
}

export type ResizeOptions = {
    handleClassName: string,
    handleStyle: Object | null,
}

export type OverlayOptions = {
    className: string,
    style: Object | null
}

export type AlignOptions = {
    attribute: string,
    aligner: {
        applyStyle: boolean
    },
    icons: {
        left: string,
        center: string,
        right: string
    }
    toolbar: {
        allowDeselect: boolean,
        mainClassName: string,
        mainStyle: Object | null,
        buttonClassName: string,
        addButtonSelectStyle: boolean,
        buttonStyle: Object | null,
        svgStyle: Object | null
    }
}

const DefaultOptions: Options = {
    specs: [
        ImageSpec,
        IframeVideoSpec
    ],
    overlay: {
        class
    }
}
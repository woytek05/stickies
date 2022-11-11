export default class Note {
    public fridgeContainerID: string = "";
    public fridgeName: string = "";
    public fridgeContainer: HTMLDivElement;
    public noteContainer: HTMLDivElement;
    public textContainer: HTMLParagraphElement;
    public closeIconContainer: HTMLElement;
    public resizeIconContainer: HTMLElement;

    public noteText: string = "Text";
    public borderColor: string = "#6f5e25";
    public borderDragColor: string = "#4f431a";
    protected noteID: string;
    protected cursorX: number = 0;
    protected cursorY: number = 0;
    protected currentX: number = 0;
    protected currentY: number = 0;
    protected xOffset: number = 0;
    protected yOffset: number = 0;
    protected draggable: boolean = false;
    protected zIndex: number = 0;

    protected width: number = 100;
    protected height: number = 100;
    protected resizeable: boolean = false;

    constructor(
        noteID: string,
        fridgeContainerID: string,
        fridgeName: string,
        noteText?: string,
        currentX?: number,
        currentY?: number,
        width?: number,
        height?: number,
        zIndex?: number
    ) {
        this.noteID = noteID;
        this.fridgeContainerID = fridgeContainerID;
        this.fridgeName = fridgeName;
        this.createContainers();
        if (noteText) {
            this.noteText = noteText;
        }
        if (currentX) {
            this.currentX = currentX;
            this.cursorX = currentX;
            this.xOffset = currentX;
        }
        if (currentY) {
            this.currentY = currentY;
            this.cursorY = currentY;
            this.yOffset = currentY;
        }
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
        if (zIndex) {
            this.zIndex = zIndex;
        }
        this.setWidthAndHeight();
        this.setTranslate();
    }

    createContainers() {
        this.fridgeContainer = document.getElementById(
            this.fridgeContainerID
        ) as HTMLDivElement;

        this.noteContainer = this.createNoteContainer();
        this.textContainer = this.createTextContainer();
        this.closeIconContainer = this.createCloseIconContainer();
        this.resizeIconContainer = this.createResizeIconContainer();

        this.noteContainer.appendChild(this.textContainer);
        this.noteContainer.appendChild(this.closeIconContainer);
        this.noteContainer.appendChild(this.resizeIconContainer);
        this.fridgeContainer.appendChild(this.noteContainer);

        this.fridgeContainer.addEventListener(
            "touchstart",
            this.dragStart.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "touchend",
            this.dragEnd.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "touchmove",
            this.drag.bind(this),
            false
        );

        this.fridgeContainer.addEventListener(
            "mousedown",
            this.dragStart.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "mouseup",
            this.dragEnd.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "mousemove",
            this.drag.bind(this),
            false
        );
    }

    dragStart(e: TouchEvent & MouseEvent) {
        if (
            e.target === this.noteContainer ||
            e.target === this.textContainer
        ) {
            this.calcCursorXAndY(e);
            this.draggable = true;
            this.noteContainer.style.borderColor = this.borderDragColor;
        } else if (e.target === this.resizeIconContainer) {
            this.calcCursorXAndY(e);
            this.resizeable = true;
            this.noteContainer.style.borderColor = this.borderDragColor;
        }
    }

    calcCursorXAndY(e: TouchEvent & MouseEvent) {
        if (e.type === "touchstart") {
            this.cursorX = e.touches[0].clientX - this.xOffset;
            this.cursorY = e.touches[0].clientY - this.yOffset;
        } else {
            this.cursorX = e.clientX - this.xOffset;
            this.cursorY = e.clientY - this.yOffset;
        }
    }

    dragEnd(e: TouchEvent & MouseEvent) {
        if (this.draggable) {
            this.cursorX = this.currentX;
            this.cursorY = this.currentY;
            this.draggable = false;
            this.noteContainer.style.borderColor = this.borderColor;
            this.send(false);
        } else if (this.resizeable) {
            this.resizeable = false;
            this.noteContainer.style.borderColor = this.borderColor;
            this.send(false);
        }
    }

    drag(e: TouchEvent & MouseEvent) {
        if (this.draggable) {
            e.preventDefault();
            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.cursorX;
                this.currentY = e.touches[0].clientY - this.cursorY;
            } else {
                this.currentX = e.clientX - this.cursorX;
                this.currentY = e.clientY - this.cursorY;
            }
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
            this.setTranslate();
        } else if (this.resizeable) {
            e.preventDefault();
            if (e.type === "touchmove") {
                this.width = e.touches[0].clientX - this.xOffset;
                this.height = e.touches[0].clientY - this.yOffset;
            } else {
                this.width = e.clientX - this.xOffset;
                this.height = e.clientY - this.yOffset;
            }
            this.setWidthAndHeight();
        }
    }

    setTranslate() {
        this.noteContainer.style.top = `${this.currentY}px`;
        this.noteContainer.style.left = `${this.currentX}px`;
    }

    setWidthAndHeight() {
        if (this.width >= 100) {
            this.noteContainer.style.width = `${this.width}px`;
        }
        if (this.height >= 100) {
            this.noteContainer.style.height = `${this.height}px`;
        }
    }

    createNoteContainer() {
        let div: HTMLDivElement = document.createElement("div");
        div.classList.add("note");
        div.style.zIndex = String(this.zIndex);
        return div;
    }

    createTextContainer() {
        let p: HTMLParagraphElement = document.createElement("p");
        p.innerText = this.noteText;
        p.classList.add("noteText");
        return p;
    }

    createCloseIconContainer() {
        let closeIcon: HTMLElement = document.createElement("box-icon");
        closeIcon.setAttribute("type", "solid");
        closeIcon.setAttribute("name", "x-circle");
        closeIcon.setAttribute("color", "#6f5e25");
        closeIcon.classList.add("noteIcon");
        closeIcon.classList.add("closeIcon");

        this.noteContainer.addEventListener("mouseover", () => {
            closeIcon.style.opacity = "1";
            closeIcon.style.pointerEvents = "auto";
        });
        this.noteContainer.addEventListener("mouseout", () => {
            closeIcon.style.opacity = "0";
            closeIcon.style.pointerEvents = "none";
        });

        closeIcon.addEventListener("mouseover", () => {
            closeIcon.setAttribute("color", "#4f431a");
            closeIcon.setAttribute("animation", "tada");
        });
        closeIcon.addEventListener("mouseout", () => {
            closeIcon.setAttribute("color", "#6f5e25");
            closeIcon.setAttribute("animation", "");
        });

        return closeIcon;
    }

    createResizeIconContainer() {
        let resizeIcon: HTMLElement = document.createElement("box-icon");
        resizeIcon.setAttribute("type", "solid");
        resizeIcon.setAttribute("name", "right-down-arrow-circle");
        resizeIcon.setAttribute("color", "#6f5e25");
        resizeIcon.classList.add("noteIcon");
        resizeIcon.classList.add("resizeIcon");

        this.noteContainer.addEventListener("mouseover", () => {
            resizeIcon.style.opacity = "1";
            resizeIcon.style.pointerEvents = "auto";
        });
        this.noteContainer.addEventListener("mouseout", () => {
            resizeIcon.style.opacity = "0";
            resizeIcon.style.pointerEvents = "none";
        });

        resizeIcon.addEventListener("mouseover", () => {
            resizeIcon.setAttribute("color", "#4f431a");
            resizeIcon.setAttribute("animation", "tada");
        });
        resizeIcon.addEventListener("mouseout", () => {
            resizeIcon.setAttribute("color", "#6f5e25");
            resizeIcon.setAttribute("animation", "");
        });

        return resizeIcon;
    }

    removeNote() {
        this.noteContainer.remove();
    }

    send(deleteNote: boolean) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "php/updateNote.php");

        xhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        xhttp.send(
            `noteID=${this.noteID}&fridgeName=${this.fridgeName}&noteText=${this.noteText}&currentX=${this.currentX}&currentY=${this.currentY}&width=${this.width}&height=${this.height}&zIndex=${this.zIndex}&deleteNote=${deleteNote}`
        );
    }
}

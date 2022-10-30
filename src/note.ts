export default class Note {
    private text : string = "";
    private fridgeContainer : HTMLDivElement
    private noteContainer : HTMLDivElement
    private active = false;
    private initialX : number;
    private initialY : number;
    private currentX : number;
    private currentY : number;
    private xOffset : number = 0;
    private yOffset : number = 0;

    constructor(fridgeContainer : HTMLDivElement) {
        this.fridgeContainer = fridgeContainer;
        this.noteContainer = this.createNoteContainer();
        this.fridgeContainer.appendChild(this.noteContainer);

        this.fridgeContainer.addEventListener("touchstart", this.dragStart.bind(this), false);
        this.fridgeContainer.addEventListener("touchend", this.dragEnd.bind(this), false);
        this.fridgeContainer.addEventListener("touchmove", this.drag.bind(this), false);

        this.fridgeContainer.addEventListener("mousedown", this.dragStart.bind(this), false);
        this.fridgeContainer.addEventListener("mouseup", this.dragEnd.bind(this), false);
        this.fridgeContainer.addEventListener("mousemove", this.drag.bind(this), false);
    }

    dragStart(e : (TouchEvent & MouseEvent)) {
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }
        if (e.target === this.noteContainer) {
            this.active = true;
        }
    }

    dragEnd(e : (TouchEvent & MouseEvent)) {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
    }

    drag(e : (TouchEvent & MouseEvent)) {
        if (this.active) {
            e.preventDefault();
            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.setTranslate(this.currentX, this.currentY, this.noteContainer);
        }
    }

    setTranslate(xPos : number, yPos : number, div : HTMLDivElement) {
        div.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    createNoteContainer() {
        let div : HTMLDivElement = document.createElement("div");
        div.classList.add("note");
        return div;
    }
}

//https://www.kirupa.com/html5/drag.htm
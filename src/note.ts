import createIconContainer from "./createIconContainer";
import showElement from "./showElement";
import hideElement from "./hideElement";
import tinymce from "tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/code";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";

export default class Note {
    public readonly fridgeName: string = "";
    public fridgeContainer: HTMLDivElement;
    public readonly fridgeContainerID: string = "";
    public noteContainer: HTMLDivElement;
    public textContainer: HTMLParagraphElement;
    public editIconContainer: HTMLElement;
    public closeIconContainer: HTMLElement;
    public resizeIconContainer: HTMLElement;

    public saveEditsIcon: HTMLElement;
    public closeEditorIcon: HTMLElement;
    public darkBgContainer: HTMLDivElement;
    public tinyMCEContainer: HTMLDivElement;

    public noteText: string = "Text";
    public borderColor: string = "#6f5e25";
    public borderDragColor: string = "#c5b785";
    protected noteID: string;
    protected cursorX: number = 100;
    protected cursorY: number = 100;
    protected currentX: number = 100;
    protected currentY: number = 100;
    protected xOffset: number = 100;
    protected yOffset: number = 100;
    protected draggable: boolean = false;
    protected zIndex: number = 0;

    protected width: number = 150;
    protected height: number = 150;
    protected resizeable: boolean = false;

    protected minimum_size = 150;
    protected original_width = 0;
    protected original_height = 0;
    protected original_x = 0;
    protected original_y = 0;
    protected original_mouse_x = 0;
    protected original_mouse_y = 0;

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
            this.textContainer.innerHTML = noteText;
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

        this.saveEditsIcon = createIconContainer("save", "#e6eef7", "#bbd6fb");
        this.closeEditorIcon = createIconContainer(
            "x-circle",
            "#e6eef7",
            "#bbd6fb"
        );
        this.closeEditorIcon.addEventListener("click", () => {
            this.hideEditor();
        });
        this.tinyMCEContainer = this.createEditor(
            this.closeEditorIcon,
            this.saveEditsIcon
        );
        hideElement(this.tinyMCEContainer, -1);
        this.darkBgContainer = document.createElement("div") as HTMLDivElement;
        this.darkBgContainer.classList.add("dark");
        hideElement(this.darkBgContainer, -1);
        this.fridgeContainer.appendChild(this.darkBgContainer);
        this.fridgeContainer.appendChild(this.tinyMCEContainer);

        this.saveEditsIcon.addEventListener("click", () => {
            this.updateNoteText();
        });
    }

    createContainers() {
        this.fridgeContainer = document.getElementById(
            this.fridgeContainerID
        ) as HTMLDivElement;

        this.noteContainer = this.createNoteContainer();
        this.textContainer = this.createTextContainer();
        this.editIconContainer = createIconContainer(
            "edit",
            "#5f511f",
            "#3f3615"
        );
        this.closeIconContainer = createIconContainer(
            "x-circle",
            "#5f511f",
            "#3f3615"
        );
        this.resizeIconContainer = createIconContainer(
            "right-down-arrow-circle",
            "#5f511f",
            "#3f3615"
        );

        for (const icon of [
            this.editIconContainer,
            this.closeIconContainer,
            this.resizeIconContainer,
        ]) {
            icon.classList.add("noteIcon");
            this.noteContainer.addEventListener("mouseover", () => {
                icon.style.opacity = "1";
                icon.style.pointerEvents = "auto";
            });
            this.noteContainer.addEventListener("mouseout", () => {
                icon.style.opacity = "0";
                icon.style.pointerEvents = "none";
            });
        }

        this.resizeIconContainer.addEventListener(
            "touchstart",
            this.resizeStart.bind(this)
        );
        this.fridgeContainer.addEventListener(
            "touchmove",
            this.resize.bind(this)
        );
        this.fridgeContainer.addEventListener(
            "touchend",
            this.resizeEnd.bind(this)
        );

        this.resizeIconContainer.addEventListener(
            "mousedown",
            this.resizeStart.bind(this)
        );
        this.fridgeContainer.addEventListener(
            "mousemove",
            this.resize.bind(this)
        );
        this.fridgeContainer.addEventListener(
            "mouseup",
            this.resizeEnd.bind(this)
        );

        this.noteContainer.appendChild(this.textContainer);
        this.noteContainer.appendChild(this.editIconContainer);
        this.noteContainer.appendChild(this.closeIconContainer);
        this.noteContainer.appendChild(this.resizeIconContainer);
        this.fridgeContainer.appendChild(this.noteContainer);

        this.fridgeContainer.addEventListener(
            "touchstart",
            this.dragStart.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "touchmove",
            this.drag.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "touchend",
            this.dragEnd.bind(this),
            false
        );

        this.fridgeContainer.addEventListener(
            "mousedown",
            this.dragStart.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "mousemove",
            this.drag.bind(this),
            false
        );
        this.fridgeContainer.addEventListener(
            "mouseup",
            this.dragEnd.bind(this),
            false
        );
    }

    dragStart(e: TouchEvent & MouseEvent) {
        if (e.target === this.noteContainer) {
            if (e.type === "touchstart") {
                this.cursorX = e.touches[0].clientX - this.xOffset;
                this.cursorY = e.touches[0].clientY - this.yOffset;
            } else {
                this.cursorX = e.clientX - this.xOffset;
                this.cursorY = e.clientY - this.yOffset;
            }
            this.draggable = true;
            this.noteContainer.style.borderColor = this.borderDragColor;
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
        }
    }

    dragEnd(e: TouchEvent & MouseEvent) {
        if (this.draggable) {
            this.cursorX = this.currentX;
            this.cursorY = this.currentY;
            this.draggable = false;
            this.noteContainer.style.borderColor = this.borderColor;
            this.send(false);
        }
    }

    resizeStart(e: TouchEvent & MouseEvent) {
        e.preventDefault();
        this.original_width = parseFloat(
            getComputedStyle(this.noteContainer)
                .getPropertyValue("width")
                .replace("px", "")
        );
        this.original_height = parseFloat(
            getComputedStyle(this.noteContainer)
                .getPropertyValue("height")
                .replace("px", "")
        );
        this.original_x = this.noteContainer.getBoundingClientRect().left;
        this.original_y = this.noteContainer.getBoundingClientRect().top;
        this.original_mouse_x = e.pageX;
        this.original_mouse_y = e.pageY;
        this.resizeable = true;
    }

    resize(e: TouchEvent & MouseEvent) {
        if (this.resizeable) {
            const width =
                this.original_width + (e.pageX - this.original_mouse_x);
            const height =
                this.original_height + (e.pageY - this.original_mouse_y);
            if (width > this.minimum_size) {
                this.noteContainer.style.width = width + "px";
                this.width = width;
            }
            if (height > this.minimum_size) {
                this.noteContainer.style.height = height + "px";
                this.height = height;
            }
        }
    }

    resizeEnd(e: MouseEvent) {
        if (this.resizeable) {
            this.resizeable = false;
            this.fridgeContainer.removeEventListener(
                "mousemove",
                this.resize.bind(this)
            );
            this.send(false);
            console.log(this);
        }
    }

    setTranslate() {
        this.noteContainer.style.top = `${this.currentY}px`;
        this.noteContainer.style.left = `${this.currentX}px`;
    }

    setWidthAndHeight() {
        this.noteContainer.style.width = `${this.width}px`;
        this.noteContainer.style.height = `${this.height}px`;
    }

    createNoteContainer() {
        const div: HTMLDivElement = document.createElement("div");
        div.classList.add("note");
        div.style.zIndex = String(this.zIndex);
        return div;
    }

    createTextContainer() {
        const p: HTMLParagraphElement = document.createElement("p");
        p.innerText = this.noteText;
        p.classList.add("noteText");
        return p;
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
            `noteID=${this.noteID}&fridgeName=${
                this.fridgeName
            }&noteText=${encodeURIComponent(this.noteText)}&currentX=${
                this.currentX
            }&currentY=${this.currentY}&width=${this.width}&height=${
                this.height
            }&zIndex=${this.zIndex}&deleteNote=${deleteNote}`
        );
    }

    createEditor(closeIcon: HTMLElement, saveIcon: HTMLElement) {
        const editorContainer: HTMLDivElement = document.createElement("div");
        editorContainer.classList.add("editor");
        const textarea: HTMLTextAreaElement =
            document.createElement("textarea");
        editorContainer.appendChild(textarea);
        editorContainer.appendChild(closeIcon);
        editorContainer.appendChild(saveIcon);

        return editorContainer;
    }

    showEditor() {
        showElement(this.darkBgContainer, 2);
        showElement(this.tinyMCEContainer, 3);
        tinymce.init({
            selector: "textarea",
            skin: "oxide-dark",
            content_css: "dark",
            width: "500px",
            height: "300px",
            resize: false,
            setup: (editor) => {
                editor.on("init", () => {
                    editor.setContent(this.noteText);
                });
            },
        });
    }

    hideEditor() {
        tinymce.activeEditor.destroy();
        hideElement(this.darkBgContainer, -1);
        hideElement(this.tinyMCEContainer, -1);
    }

    updateNoteText() {
        this.noteText = tinymce.activeEditor.getContent();
        this.textContainer.innerHTML = tinymce.activeEditor.getContent();
        this.send(false);
    }
}

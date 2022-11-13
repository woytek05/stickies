import Note from "./note";
import { fridgeJson } from "./fridgeJson";

export default class Fridge {
    public fridgeName: string = "";
    public mainContainerID: string = "";
    public mainContainer: HTMLDivElement;
    public addNoteID: string = "";
    public addNoteContainer: HTMLElement;
    public numOfActiveNotesParagraph: HTMLParagraphElement;
    public numOfAllNotesParagraph: HTMLParagraphElement;
    public infoContainer: HTMLDivElement;

    protected notes: Set<Note> = new Set();
    protected numOfActiveNotes: number = 0;
    protected numOfAllNotes: number = 0;
    protected noteIdIterator: number = 0;

    constructor(
        fridgeName: string,
        mainContainerID: string,
        addNoteID: string,
        notes?: Set<Note>,
        numOfActiveNotes?: number,
        numOfAllNotes?: number
    ) {
        this.fridgeName = fridgeName;
        this.mainContainerID = mainContainerID;
        this.mainContainer = document.getElementById(
            this.mainContainerID
        ) as HTMLDivElement;
        this.addNoteID = addNoteID;
        this.addNoteContainer = document.getElementById(
            this.addNoteID
        ) as HTMLElement;
        if (notes) {
            this.notes = notes;
        }
        if (numOfActiveNotes) {
            this.numOfActiveNotes = numOfActiveNotes;
        }
        if (numOfAllNotes) {
            this.numOfAllNotes = numOfAllNotes;
        }
        this.addNoteContainer.addEventListener("click", () => {
            let note = new Note(
                `${this.fridgeName}_${this.noteIdIterator}`,
                this.mainContainerID,
                this.fridgeName
            );
            this.noteIdIterator++;
            // TODO: zIndex
            // note.noteContainer.addEventListener("click", () => {
            //     note.zIndex;
            // });

            this.addEventListenersToNote(note);
            this.notes.add(note);

            this.numOfActiveNotes += 1;
            this.numOfAllNotes += 1;
            this.updateInfoParagraphs();

            note.send(false);
            this.send();
        });

        this.numOfActiveNotesParagraph = this.createInfoParagraph();
        this.numOfAllNotesParagraph = this.createInfoParagraph();
        this.updateInfoParagraphs();
        this.infoContainer = this.createInfoContainer();
        this.infoContainer.appendChild(this.numOfActiveNotesParagraph);
        this.infoContainer.appendChild(this.numOfAllNotesParagraph);
        this.mainContainer.appendChild(this.infoContainer);
    }

    addNote(note: Note) {
        this.notes.add(note);
    }

    addEventListenersToNote(note: Note) {
        note.closeIconContainer.addEventListener("click", () => {
            note.removeNote();
            this.notes.delete(note);
            this.numOfActiveNotes--;
            this.updateInfoParagraphs();
            note.send(true);
            this.send();
        });
        note.editIconContainer.addEventListener("click", () => {
            note.showEditor();
        });
    }

    static fromJSON(json: fridgeJson) {
        let fridge = new Fridge(
            json.fridgeName,
            "mainContainer",
            "addNote",
            new Set<Note>(),
            json.numOfActiveNotes,
            json.numOfAllNotes
        );

        for (const note of json.notes) {
            let noteObject = new Note(
                note.noteID,
                "mainContainer",
                fridge.fridgeName,
                note.noteText,
                note.currentX,
                note.currentY,
                note.width,
                note.height,
                note.zIndex
            );
            fridge.addEventListenersToNote(noteObject);
            fridge.addNote(noteObject);
            fridge.noteIdIterator++;
        }

        return fridge;
    }

    createInfoContainer() {
        const infoContainer: HTMLDivElement = document.createElement("div");
        infoContainer.classList.add("info");
        return infoContainer;
    }

    updateInfoParagraphs() {
        this.numOfActiveNotesParagraph.innerText = `Active notes: ${this.numOfActiveNotes}`;
        this.numOfAllNotesParagraph.innerText = `All notes: ${this.numOfAllNotes}`;
    }

    createInfoParagraph() {
        const infoParagraph: HTMLParagraphElement = document.createElement("p");
        infoParagraph.style.userSelect = "none";
        return infoParagraph;
    }

    send() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "php/updateFridge.php");

        xhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );

        xhttp.send(
            `fridgeName=${this.fridgeName}&numOfActiveNotes=${this.numOfActiveNotes}&numOfAllNotes=${this.numOfAllNotes}`
        );
    }
}
